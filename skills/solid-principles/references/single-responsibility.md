# Single Responsibility Principle (SRP)

> A class should have **one reason to change**.

The famous one-liner is "a class should do one thing," but that's too vague to act on — "one
thing" can mean anything at any zoom level. Robert Martin's sharper definition: **a module
should be responsible to one, and only one, actor.** A "reason to change" is a *person or role*
who can request a change — the accountant, the DBA, the marketing team. If two different actors
can force edits to the same class, those responsibilities belong in different classes.

## The smell

- A class named `*Manager`, `*Util`, `*Helper`, `*Processor`, or `*Service` that has grown to
  do several unrelated jobs.
- One class that **computes** business logic, **formats** output, **persists** to a database,
  *and* **sends** email/HTTP — four reasons to change in one file.
- A merge conflict magnet: every feature touches this file for a different reason.
- You can't unit-test the interesting logic without spinning up a database or a mail server,
  because the logic and the I/O live in the same method.

## What "one reason to change" really means

Ask: *who asks for changes here?* If the report's math changes when the **accounting** rules
change, but the report's layout changes when **marketing** wants a new look, but where it's
stored changes when the **DBA** migrates databases — that's three actors, three
responsibilities, three classes. Splitting them means a change requested by one actor can't
break what another actor depends on.

## Bad → Good in TypeScript

```ts
// ❌ One class, three reasons to change: math (finance), layout (marketing), I/O (ops).
class Report {
  constructor(private readonly rows: Row[]) {}

  totalRevenue(): number {
    return this.rows.reduce((sum, r) => sum + r.qty * r.unitPrice, 0); // finance changes this
  }

  toHtml(): string {
    const total = this.totalRevenue();
    return `<h1>Revenue</h1><p>${total.toFixed(2)}</p>`; // marketing changes this
  }

  async save(): Promise<void> {
    await fs.writeFile("report.html", this.toHtml()); // ops changes this
  }
}
```

```ts
// ✅ One responsibility each — they change for independent reasons and test in isolation.
class RevenueCalculator {
  constructor(private readonly rows: Row[]) {}
  total(): number {
    return this.rows.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);
  }
}

class HtmlReportFormatter {
  format(total: number): string {
    return `<h1>Revenue</h1><p>${total.toFixed(2)}</p>`;
  }
}

interface ReportSink {
  write(name: string, content: string): Promise<void>;
}

// A thin orchestrator wires them; it has no business logic of its own.
class ReportJob {
  constructor(
    private readonly calc: RevenueCalculator,
    private readonly formatter: HtmlReportFormatter,
    private readonly sink: ReportSink,
  ) {}
  async run(): Promise<void> {
    const html = this.formatter.format(this.calc.total());
    await this.sink.write("report.html", html);
  }
}
```

Now `RevenueCalculator` is pure and trivially testable; the formatter changes when marketing
asks; the sink (a `ReportSink` abstraction — see `dependency-inversion.md`) changes when ops
migrates storage. None of those edits touch the others.

## Bad → Good in Python

```python
# ❌ A god "User" class: domain identity + password hashing + persistence + email.
class User:
    def __init__(self, email: str, password: str) -> None:
        self.email = email
        self.password_hash = hashlib.sha256(password.encode()).hexdigest()  # security concern

    def save(self) -> None:                                  # persistence concern
        db.execute("INSERT INTO users ...", self.email, self.password_hash)

    def send_welcome(self) -> None:                          # messaging concern
        smtp.send(self.email, "Welcome!", "Thanks for joining")
```

```python
# ✅ The entity holds identity/rules; hashing, storage, and email are separate collaborators.
from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class User:
    email: str
    password_hash: str


class PasswordHasher(Protocol):
    def hash(self, raw: str) -> str: ...


class UserRepository(Protocol):
    def add(self, user: User) -> None: ...


class WelcomeMailer(Protocol):
    def send(self, to: str) -> None: ...


class RegisterUser:
    """One reason to change: the registration workflow."""

    def __init__(
        self, hasher: PasswordHasher, repo: UserRepository, mailer: WelcomeMailer
    ) -> None:
        self._hasher = hasher
        self._repo = repo
        self._mailer = mailer

    def __call__(self, email: str, raw_password: str) -> User:
        user = User(email=email, password_hash=self._hasher.hash(raw_password))
        self._repo.add(user)
        self._mailer.send(user.email)
        return user
```

Each `Protocol` is a seam the use case depends on (DIP + ISP); swapping the mailer or the
storage never touches the `User` entity or the hashing rule.

## Nuance — don't shatter cohesion chasing "one method per class"

SRP is about **reasons to change**, not method count. A class with five methods that all serve
the *same* responsibility (a `Money` value object with `add`, `subtract`, `allocate`,
`format`, `equals`) is perfectly cohesive — splitting it would be the *opposite* mistake
(anemic explosion; see `anti-patterns.md`). The test is conceptual: *would two different actors
ever request changes here?* If no, leave it whole. Cohesion (things that change together live
together) and SRP (things that change for different reasons live apart) are two sides of the
same coin.

For a genuinely simple CRUD path, a single handler that reads input, touches the DB, and
returns is fine — there's only one reason it'll change. SRP earns its keep when responsibilities
*actually* diverge.

## See also

- `references/dependency-inversion.md` — the seams an SRP split creates (repository, mailer)
  should be abstractions you inject, not concretes you `new`.
- `references/interface-segregation.md` — keep each extracted collaborator's interface narrow.
- `references/typescript-examples.md` / `references/python-examples.md` — SRP applied across a
  whole notification system (formatting ≠ sending ≠ logging).
- `domain-driven-design` — SRP at the architecture level: keep domain logic out of
  infrastructure; thin application services orchestrate.
