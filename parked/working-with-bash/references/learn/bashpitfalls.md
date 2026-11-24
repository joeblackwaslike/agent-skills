---
source: "https://mywiki.wooledge.org/BashPitfalls?action=raw"
fetched_at: "2026-11-16T12:28:22.643Z"
sha256: "cb9fad3caa0bab04fa0f7967b479bef4406e5d45d7dd31a08fa7db27488f32ff"
---

This page is a compilation of common mistakes made by bash users. Each example is flawed in some way.

<span id="pf1"></span>
== for f in $(ls *.mp3) ==
One of the most common mistakes [[BASH]] programmers make is to write a loop like this:

<pre>
for f in $(ls *.mp3); do    # Wrong!
    some command $f         # Wrong!
done

for f in $(ls)              # Wrong!
for f in `ls`               # Wrong!

for f in $(find . -type f)  # Wrong!
for f in `find . -type f`   # Wrong!

files=($(find . -type f))   # Wrong!
for f in ${files[@]}        # Wrong!
</pre>

Yes, it would be great if you could just treat the output of <code>ls</code> or <code>find</code> as a list of filenames and iterate over it.  But you '''cannot'''.  This entire approach is fatally flawed, and there is no trick that can make it work.  You must use an entirely different approach.

There are at least 6 problems with this:

# If a filename contains whitespace (or any character in the current value of <code>$IFS</code>), it undergoes [[WordSplitting]].  Assuming we have a file named <code>01 - Don't Eat the Yellow Snow.mp3</code> in the current directory, the <code>for</code> loop will iterate over each word in the resulting file name: ''01'', ''-'', ''Don't'', ''Eat'', etc.
# If a filename contains [[glob]] characters, it undergoes filename expansion ("[[glob|globbing]]").  If <code>ls</code> produces any output containing a '''*''' character, the word containing it will become recognized as a pattern and substituted with a list of all filenames that match it.
# If the command substitution returns multiple filenames, there is no way to tell where the first one ends and the second one begins.  Pathnames may contain ''any'' character except NUL.  Yes, this includes newlines.
# The <code>ls</code> utility may mangle filenames.  Depending on which platform you're on, which arguments you used (or didn't use), and whether its standard output is pointing to a terminal or not, <code>ls</code> may randomly decide to replace certain characters in a filename with "?", or simply not print them at all. [[ParsingLs|Never try to parse the output of ls]]. <code>ls</code> is just plain unnecessary. It's an external command whose output is intended specifically to be read by a human, not parsed by a script.
# The CommandSubstitution strips ''all'' trailing newline characters from its output.  That may seem desirable since <code>ls</code> adds a newline, but if the last filename in the list ends with a newline, <code>`…`</code> or <code>$()</code> will remove ''that'' one also.
# In the <code>ls</code> examples, if the first filename starts with a hyphen, it may lead to [[#pf3|pitfall #3]].

You can't simply double-quote the substitution either:

<pre>
for f in "$(ls *.mp3)"; do     # Wrong!
</pre>

This causes the entire output of <code>ls</code> to be treated as a single word. Instead of iterating over each file name, the loop will only execute ''once'', assigning to <code>f</code> a string with all the filenames rammed together.

Nor can you simply change [[IFS]] to a newline.  Filenames can also contain newlines.

Another variation on this theme is abusing word splitting and a <code>for</code> loop to (incorrectly) read lines of a file.  For example:

<pre>
IFS=$'\n'
for line in $(cat file); do …     # Wrong!
</pre>
[[DontReadLinesWithFor|This doesn't work]]!  Especially if those lines are filenames.  Bash (or any other Bourne family shell) just doesn't work this way.

'''So, what's the right way to do it?'''

There are several ways, primarily depending on whether you need a recursive expansion or not.

If you don't need recursion, you can use a simple [[glob]].  Instead of <code>ls</code>:

<pre>
for file in ./*.mp3; do    # Better! and…
    some command "$file"   # …always double-quote expansions!
done
</pre>
POSIX shells such as Bash have the globbing feature specifically for this purpose — to allow the shell to expand patterns into a list of matching filenames. There is no need to interpret the results of an external utility. Because globbing is the very last expansion step, each match of the <code>./*.mp3</code> pattern correctly expands to a separate word, and isn't subject to the effects of an unquoted expansion.

''Question:'' What happens if there are no *.mp3-files in the current directory? Then the for loop is executed once, with file="./*.mp3", which is not the expected behavior! The workaround is to test whether there is a matching file:

<pre>
# POSIX
for file in ./*.mp3; do
    [ -e "$file" ] || continue
    some command "$file"
done
</pre>
Another solution is to use Bash's <code>shopt -s nullglob</code> feature, though this should only be done after reading the documentation and carefully considering the effect of this setting on all other globs in the script.

If you need recursion, the standard solution is <code>find</code>.  When [[UsingFind|using find]], be sure you use it properly.  For POSIX sh portability, use the <code>-exec</code> option:

<pre>
find . -type f -name '*.mp3' -exec some command {} \;

# Or, if the command accepts multiple input filenames:

find . -type f -name '*.mp3' -exec some command {} +
</pre>
If you're using bash, then you have two additional options.  One is to use GNU or BSD <code>find</code>'s <code>-print0</code> option, together with bash's <code><nowiki>read -d ''</nowiki></code> option and a [[ProcessSubstitution]]:

<pre>
while IFS= LC_ALL=C read -r -d '' file; do
  some command "$file"
done < <(find . -type f -name '*.mp3' -print0)
</pre>
The advantage here is that "some command" (indeed, the entire <code>while</code> loop body) is executed in the current shell.  You can set variables and have them [[BashFAQ/024|persist after the loop ends]]. (Why <code>LC_ALL=C</code>?  See [[#pf65|Pitfall #65]].)

The other option, available in [[BashFAQ/061|Bash 4.0 and higher]], is <code>globstar</code>, which permits a glob to be expanded recursively:

<pre>
shopt -u failglob; shopt -s globstar nullglob # dotglob
for file in ./**/*.mp3; do
  some command "$file"
done
</pre>
Note the double quotes around <code>$file</code> in the examples above. This leads to our second pitfall:

<span id="pf2"></span>
== cp $file $target ==
What's wrong with the command shown above? Well, nothing, '''if''' you happen to know in advance that <code>$file</code> and <code>$target</code> have no white space (and you've not modified <code>$IFS</code>, and you can guarantee the code won't be called in a context where <code>$IFS</code> may have been modified) or [[glob|wildcards]] in them. However, the results of the expansions are still subject to [[WordSplitting]] and [[glob|pathname expansion]]. Always double-quote parameter expansions.

<pre>
cp -- "$file" "$target"
</pre>
Without the double quotes, you'll get a command like <code>cp 01 - Don't Eat the Yellow Snow.mp3 /mnt/usb</code>, which will result in errors like <code>cp: cannot stat '01': No such file or directory</code>. If <code>$file</code> has wildcards in it ('''*''' or '''?''' or '''['''), they will be [[glob|expanded]] if there are files that match them. With the double quotes, all's well, unless "$file" happens to start with a <code>-</code>, in which case <code>cp</code> thinks you're trying to feed it command line options (See [[#pf3|pitfall #3]] below.)

Even in the somewhat uncommon circumstance that you can guarantee the variable's contents, it is conventional and good practice to [[Quotes|quote]] parameter expansions, especially if they contain file names. Experienced script writers will always use [[Quotes|quotes]] except perhaps for a small number of cases in which it is ''absolutely'' obvious from the immediate code context that a parameter contains a guaranteed safe value. Experts will most likely consider the <code>cp</code> command in the title always wrong. You should too.

<span id="pf3"></span>
== Filenames with leading dashes ==
Filenames with leading dashes can cause many problems. Globs like <code>*.mp3</code> are sorted into an expanded list (according to your current [[locale]]), and <code>-</code> sorts before letters in most locales. The list is then passed to some command, which may incorrectly interpret the <code>-filename</code> as an option. There are two major solutions to this.

One solution is to insert <code>--</code> between the command (like <code>cp</code>) and its arguments. That tells it to stop scanning for options, and all is well:

<pre>
cp -- "$file" "$target"
</pre>
There are potential problems with this approach. You have to be sure to insert <code>--</code> for ''every'' usage of the parameter in a context where it might possibly be interpreted as an option — which is easy to miss and may involve a lot of redundancy.

Most well-written option parsing libraries understand this, and the programs that use them correctly should inherit that feature for free. However, still be aware that it is ultimately up to the application to recognize ''end of options''. Some programs that manually parse options, or do it incorrectly, or use poor 3rd-party libraries may not recognize it. Standard utilities ''should'', with a few exceptions that are specified by POSIX. <code>echo</code> is one example.

Another option is to ensure that your filenames always begin with a directory by using relative or absolute pathnames.

<pre>
for i in ./*.mp3; do
    cp "$i" /target
    …
done
</pre>
In this case, even if we have a file whose name begins with <code>-</code>, the glob will ensure that the variable always contains something like <code>./-foo.mp3</code>, which is perfectly safe as far as <code>cp</code> is concerned.

Finally, if you can guarantee that all results will have the same prefix, and are only using the variable a few times within a loop body, you can simply concatenate the prefix with the expansion. This gives a theoretical savings in generating and storing a few extra characters for each word.

<pre>
for i in *.mp3; do
    cp "./$i" /target
    …
done
</pre>

<span id="pf4"></span>
== [ $foo = "bar" ] ==
This is very similar to the issue in pitfall #2, but I repeat it because it's ''so'' important. In the example above, the [[Quotes|quotes]] are in the wrong place. You do ''not'' need to quote a string literal in bash (unless it contains metacharacters or pattern characters). But you ''should'' quote your variables if you aren't sure whether they could contain white space or wildcards.

This example can break for several reasons:

<ul><li> If a variable referenced in <code>[</code> doesn't exist, or is blank, then the <code>[</code> command would end up looking like:
 <pre>
[ = "bar" ] # Wrong!
</pre>
: …and will throw the error: <code>unary operator expected</code>. (The <code>=</code> operator is ''binary'', not unary, so the <code>[</code> command is rather shocked to see it there.)
<li> If the variable contains internal whitespace, then it gets [[WordSplitting|split into separate words]] before the <code>[</code> command sees it. Thus:
 <pre>
[ multiple words here = "bar" ]
</pre>
: While that may look OK to you, it's a syntax error as far as <code>[</code> is concerned. The correct way to write this is:
 <pre>
# POSIX
[ "$foo" = bar ] # Right!
</pre>
: This works fine on POSIX-conformant implementations even if <code>$foo</code> begins with a <code>-</code>, because POSIX <code>[</code> determines its action depending on the number of arguments passed to it. Only very ancient shells have a problem with this, and you shouldn't worry about them when writing new code (see the <code>x"$foo"</code> workaround below).
</ul>

In Bash and many other ksh-like shells, there is a superior alternative which uses the [[BashFAQ/031|&#91;&#91; keyword]].

<pre>
# Bash / Ksh
[[ $foo == bar ]] # Right!
</pre>
You don't need to quote variable references on the left-hand side of <code>=</code> in <code><nowiki>[[ ]]</nowiki></code> because they don't undergo word splitting or [[glob|globbing]], and even blank variables will be handled correctly. On the other hand, quoting them won't hurt anything either. Unlike <code>[</code> and <code>test</code>, you may also use the identical <code>==</code>. Do note however that comparisons using <code>[[</code> perform pattern matching against the string on the right hand side, not just a plain string comparison. To make the string on the right literal, you must quote it if any characters that have special meaning in pattern matching contexts are used.

<pre>
# Bash / Ksh
match=b*r
[[ $foo == "$match" ]] # Good! Unquoted would also match against the pattern b*r.
</pre>
You may have seen code like this:

<pre>
# POSIX / Bourne
[ x"$foo" = xbar ] # Ok, but usually unnecessary.
</pre>

The <code>x"$foo"</code> hack is required for code that must run on ''very'' ancient shells which lack [[BashFAQ/031|&#91;&#91;]] and have a more primitive <code>[</code>, which [https://www.vidarholen.net/contents/blog/?p=1035 gets confused] if <code>$foo</code> begins with a <code>-</code> or is <code>!</code> or <code>(</code>. On said older systems, <code>[</code> only requires extra caution for the token on the left-hand side of <code>=</code>; it handles the right-hand token correctly.

Note that shells that require this workaround are not POSIX-conforming. Such extreme portability is rarely a requirement and makes your code less readable (and uglier).

<span id="pf5"></span>

== cd $(dirname "$f") ==
This is yet another [[Quotes|quoting]] error. As with a variable expansion, the result of a CommandSubstitution undergoes [[WordSplitting]] and [[glob|pathname expansion]]. So you should quote it:

<pre>
cd -P -- "$(dirname -- "$f")"
</pre>
What's not obvious here is how the [[Quotes|quotes]] nest. A C programmer reading this would expect the first and second double-quotes to be grouped together; and then the third and fourth. But that's not the case in Bash. Bash treats the double-quotes ''inside'' the command substitution as one pair, and the double-quotes ''outside'' the substitution as another pair.

Another way of writing this: the parser treats the command substitution as a "nesting level", and the quotes inside it are separate from the quotes outside it.

<span id="pf6"></span>
== [ "$foo" = bar && "$bar" = foo ] ==
You can't use <code>&&</code> inside the [[BashFAQ/031|old test (or [) command]]. The Bash parser sees <code>&&</code> outside of <code>[[ ]]</code> or <code>(( ))</code> and breaks your command into ''two'' commands, before and after the <code>&&</code>. Use one of these instead:

<pre>
[ bar = "$foo" ] && [ foo = "$bar" ] # Right! (POSIX)
[[ $foo = bar && $bar = foo ]]       # Also right! (Bash / Ksh)
</pre>

(Note that we reversed the constant and the variable inside <code>[</code> for the legacy reasons discussed in [[#pf4|pitfall #4]]. We could also have reversed the <code><nowiki>[[</nowiki></code> case, but the expansions would require quoting to prevent interpretation as a pattern.) The same thing applies to <code>||</code>. Either use <code><nowiki>[[</nowiki></code> instead, or use two <code>[</code> commands.

Avoid this:

<pre>
[ bar = "$foo" -a foo = "$bar" ] # Not portable.
</pre>

The binary <code>-a</code> and <code>-o</code>, and <code>(</code> / <code>)</code> (grouping) operators are XSI extensions to the POSIX standard. All are marked as obsolescent in POSIX-2008. They should not be used in new code. One of the practical problems with <code>[ A = B -a C = D ]</code> (or <code>-o</code>) is that [http://www.opengroup.org/onlinepubs/9699919799/utilities/test.html POSIX does not specify] the results of a <code>test</code> or <code>[</code> command with more than 4 arguments. It probably works in most shells, but you can't count on it. If you have to write for POSIX shells, then you should use two <code>test</code> or <code>[</code> commands separated by a <code>&&</code> operator instead.

<span id="pf7"></span>
== [[ $foo > 7 ]] ==
There are multiple issues here. First, the [[BashFAQ/031|&#91;&#91; command]] should ''not'' be used solely for evaluating [[ArithmeticExpression|arithmetic expressions]]. It should be used for test expressions involving one of the supported test operators. Though technically you ''can'' do math using some of <code><nowiki>[[</nowiki></code>'s operators, it only makes sense to do so in conjunction with one of the non-math test operators somewhere in the expression. If you just want to do a numeric comparison (or any other shell arithmetic), it is much better to just use <code>(( ))</code> instead:

<pre>
# Bash / Ksh
((foo > 7))     # Right!
[[ foo -gt 7 ]] # Works, but is uncommon. Use ((…)) instead.
</pre>

If you use the <code>></code> operator inside <code><nowiki>[[ ]]</nowiki></code>, it's treated as a string comparison (test for collation order by locale), ''not'' an integer comparison. This may work sometimes, but it will fail when you least expect it. If you use <code>></code> inside <code>[ ]</code>, it's even worse: it's an output redirection. You'll get a file named <code>7</code> in your directory, and the test will succeed as long as <code>$foo</code> is not empty.

If strict POSIX-conformance is a requirement, and <code>((</code> is not available, then the correct alternative using <code>[</code> is

<pre>
# POSIX
[ "$foo" -gt 7 ]       # Also right!
[ "$((foo > 7))" -ne 0 ] # POSIX-compatible equivalent to ((, for more general math operations.
</pre>

If the contents of <code>$foo</code> are not sanitised and are out of your control (if for instance they're coming from an external source), then all but <code>[ "$foo" -gt 7 ]</code> constitute an arbitrary command injection vulnerability as the contents of <code>$foo</code> are interpreted as an arithmetic expression (and for instance, the <code>a[$(reboot)]</code> arithmetic expression would run the <code>reboot</code> command when evaluated). The <code>[</code> builtin requires the operands be ''decimal'' integers, so it's not affected. But it's critical that <code>$foo</code> be quoted, or you'd still get a command injection vulnerability (for instance with values such as <code>-v a[$(reboot)] -o 8</code>).

If the input to any arithmetic context (including <code>((</code>, <code>let</code>, array indices), or <code><nowiki>[[ … ]]</nowiki></code> test expressions involving numeric comparisons can't be guaranteed then you must ''always'' [[BashFAQ/054|validate your input before evaluating the expression]].

<pre>
# POSIX
case $foo in
    ("" | *[!0123456789]*)
        printf '$foo is not a sequence of decimal digits: "%s"\n' "$foo" >&2
        exit 1
        ;;
    *)
        [ "$foo" -gt 7 ]
esac
</pre>

Note that as <code>[</code>/<code>test</code>'s arithmetic operator expect ''decimal'' integers, 010 for instance would be interpreted as the number 10, not 8 expressed in octal. In <code>bash</code>, <code>[ 010 -gt 8 ]</code> would return true, while <code><nowiki>[[ 010 -gt 8 ]]</nowiki></code> and <code>(( 010 > 8 ))</code> would return false.

<span id="pf8"></span>
== grep foo bar | while read -r; do ((count++)); done ==
The code above looks OK at first glance, doesn't it? Sure, it's just a poor implementation of <code>grep -c</code>, but it's intended as a simplistic example. Changes to <code>count</code> won't propagate outside the <code>while</code> loop because each command in a pipeline is executed in a separate [[SubShell]]. This surprises almost every Bash beginner at some point.

POSIX doesn't specify whether or not the last element of a pipeline is evaluated in a subshell. Some shells such as ksh93 and Bash >= 4.2 with <code>shopt -s lastpipe</code> enabled will run the <code>while</code> loop in this example in the original shell process, allowing any side-effects within to take effect. Therefore, portable scripts must be written in such a way as to not depend upon either behavior.

For workarounds for this and similar issues, please see [[BashFAQ/024|Bash FAQ #24]]. It's a bit too long to fit here.

<span id="pf9"></span>
== if [grep foo myfile] ==
Many beginners have an incorrect intuition about <code>if</code> statements brought about by seeing the very common pattern of an <code>if</code> keyword followed immediately by a <code>[</code> or <code><nowiki>[[</nowiki></code>. This convinces people that the <code>[</code> is somehow part of the <code>if</code> statement's syntax, just like parentheses used in C's <code>if</code> statement.

This is ''not'' the case! <code>if</code> takes a ''command''. <code>[</code> is a command, not a syntax marker for the <code>if</code> statement. It's equivalent to the <code>test</code> command, except that the final argument must be a <code>]</code>. For example:

<pre>
# POSIX
if [ false ]; then echo "HELP"; fi
if test false; then echo "HELP"; fi
</pre>
are equivalent — both checking that the argument "false" is non-empty. In both cases HELP will always be printed, to the surprise of programmers from other languages guessing about shell syntax.

The syntax of an <code>if</code> statement is:

<pre>
if COMMANDS
then <COMMANDS>
elif <COMMANDS> # optional
then <COMMANDS>
else <COMMANDS> # optional
fi # required
</pre>
Once again, <code>[</code> is a command. It takes arguments like any other regular ''simple command''. <code>if</code> is a ''compound command'' which contains other commands — and '''there is no [''' in its syntax!

While bash has a builtin command <code>[</code> and thus ''knows'' about <code>[</code> it has nothing special to do with <code>]</code>. Bash only passes <code>]</code> as argument to the <code>[</code> command, which requires <code>]</code> to be the last argument only to make scripts look better.

There may be zero or more optional <code>elif</code> sections, and one optional <code>else</code> section.

The <code>if</code> compound command is made up of two or more sections containing ''lists'' of commands, each delimited by a <code>then</code>, <code>elif</code>, or <code>else</code> keyword, and is terminated by the <code>fi</code> keyword. The exit status of the final command of the first section and each subsequent <code>elif</code> section determines whether each corresponding <code>then</code> section is evaluated. Another <code>elif</code> is evaluated until one of the <code>then</code> sections is executed. If no <code>then</code> section is evaluated, then the <code>else</code> branch is taken, or if no <code>else</code> is given, the <code>if</code> block is complete and the overall <code>if</code> command returns 0 (true).

If you want to make a decision based on the output of a <code>grep</code> command, you do ''not'' want to enclose it in parentheses, brackets, backticks, or ''any other'' syntax! Just use <code>grep</code> as the <code>COMMANDS</code> after the <code>if</code>, like this:

<pre>
if grep -q fooregex myfile; then
…
fi
</pre>
If the <code>grep</code> matches a line from <code>myfile</code>, then the exit code will be 0 (true), and the <code>then</code> part will be executed. Otherwise, if there are no matches, <code>grep</code> will return non-zero and the overall <code>if</code> command will be zero.

'''See also:'''

* [[BashGuide/TestsAndConditionals]]
* http://wiki.bash-hackers.org/syntax/ccmd/if_clause

<span id="pf10"></span>
== if [bar="$foo"]; then … ==
<pre>
[bar="$foo"]     # Wrong!
[ bar="$foo" ]   # Still wrong!
[bar = "$foo"]   # Also wrong!
[[bar="$foo"]]   # Wrong again!
[[ bar="$foo" ]] # Guess what?  Wrong!
[[bar = "$foo"]] # Do I really need to say it…
</pre>

As explained in the previous example, <code>[</code> is a command (which can be proven with <code>type -t [</code> or <code>whence -v [</code>). Just like with any other simple command, Bash expects the command to be followed by a space, then the first argument, then another space, etc. You can't just run things all together without putting the spaces in! Here are the correct ways:

<pre>
if [ bar = "$foo" ]; then …

if [[ bar = "$foo" ]]; then …
</pre>

In the first form, <code>[</code> is the command name, and <code>bar</code>, <code>=</code>, the expansion of <code>"$foo"</code>, and <code>]</code> are separate [[Arguments|arguments]] to it. There must be whitespace between each pair of arguments, so the shell knows where each argument begins and ends.  The second form is similar, except that <code><nowiki>[[</nowiki></code> is a special keyword, which is terminated by the <code><nowiki>]]</nowiki></code>.  For more details on the difference between the two, see [[BashFAQ/031|Bash FAQ 31]].

<span id="pf11"></span>
== if [ [ a = b ] && [ c = d ] ]; then … ==
Here we go again. <code>[</code> is a ''command''. It is not a syntactic marker that sits between <code>if</code> and some sort of C-like "condition". Nor is it used for grouping. You cannot take C-like <code>if</code> commands and translate them into Bash commands just by replacing parentheses with square brackets!

If you want to express a compound conditional, do this:

<pre>
if [ a = b ] && [ c = d ]; then …
</pre>
Note that here we have two ''commands'' after the <code>if</code>, joined by an <code>&&</code> (logical AND, shortcut evaluation) operator. It's precisely the same as:

<pre>
if test a = b && test c = d; then …
</pre>
If the first <code>test</code> command returns false, the body of the <code>if</code> statement is not entered. If it returns true, then the second <code>test</code> command is run; and if that also one returns true, then the body of the <code>if</code> statement ''will'' be entered.  (C programmers are already familiar with <code>&&</code>.  Bash uses the same ''short-circuit evaluation''.  Likewise <code>||</code> does short-circuit evaluation for the ''OR'' operation.)

The [[BashFAQ/031|&#91;&#91; keyword]] ''does'' permit the use of <code>&&</code>, so it could also be written this way:

<pre>
if [[ a = b && c = d ]]; then …
</pre>
See [[#pf6|pitfall #6]] for a pitfall related to ''tests'' combined with conditional operators.

<span id="pf12"></span>
== read $foo ==
You don't use a <code>$</code> before the variable name in a <code>read</code> command.  If you want to put data into the variable named <code>foo</code>, you do it like this:

<pre>
 read foo
</pre>

Or more safely:

<pre>
 IFS= read -r foo
</pre>

<code>read $foo</code> would read a line of input and put it in the variable(s) whose name(s) are in <code>$foo</code>.  This might be useful if you actually intended <code>foo</code> to be a [[BashFAQ/006|reference]] to some other variable; but in the majority of cases, this is simply a bug.

<span id="pf13"></span>
== cat file | sed s/foo/bar/ > file ==
You '''cannot''' read from a file and write to it in the same pipeline. Depending on what your pipeline does, the file may be clobbered (to 0 bytes, or possibly to a number of bytes equal to the size of your operating system's pipeline buffer), or it may grow until it fills the available disk space, or reaches your operating system's file size limitation, or your quota, etc.

If you want to make a change to a file safely, other than appending to the end of it, use a text editor.

<pre>
printf %s\\n ',s/foo/bar/g' w q | ed -s file
</pre>

If you are doing something that cannot be done with a text editor there ''must'' be a temporary file created at some point(*). For example, the following is completely portable:

<pre>
sed 's/foo/bar/g' file > tmpfile && mv tmpfile file
</pre>

The following will ''only'' work on GNU sed 4.x:

<pre>
sed -i 's/foo/bar/g' file(s)
</pre>

Note that this also creates a temporary file, and does the same sort of renaming trickery — it just handles it transparently.

And the following equivalent command requires perl 5.x:

<pre>
perl -pi -e 's/foo/bar/g' file(s)
</pre>

For more details on replacing contents of files, please see [[BashFAQ/021|Bash FAQ #21]].

(*) <code>sponge</code> from [http://packages.debian.org/sid/moreutils moreutils] uses this example in its manual:

<pre>
sed '…' file | grep '…' | sponge file
</pre>

Rather than using a temporary file plus an atomic <code>mv</code>, this version "soaks up" (the actual description in the manual!) all the data, before opening and writing to the <code>file</code>.  This version will cause data loss if the program or system crashes during the write operation, because there's no copy of the original file on disk at that point.

Using a temporary file + <code>mv</code> still incurs a slight risk of data loss in case of a system crash / power loss; to be 100% certain that either the old or the new file will survive a power loss, you must use <code>sync</code> before the <code>mv</code>.

<span id="pf14"></span>
== echo $foo ==
This relatively innocent-looking command causes ''massive'' confusion. Because the <code>$foo</code> isn't [[Quotes|quoted]], it will not only be subject to [[WordSplitting]], but also file [[glob|globbing]]. This misleads Bash programmers into thinking their variables ''contain'' the wrong values, when in fact the variables are OK — it's just the word splitting or filename expansion that's messing up their view of what's happening.

<pre>
msg="Please enter a file name of the form *.zip"
echo $msg
</pre>

This message is split into words and any globs are expanded, such as the *.zip. What will your users think when they see this message:

<pre>
Please enter a file name of the form freenfss.zip lw35nfss.zip
</pre>

To demonstrate:

<pre>
var="*.zip"   # var contains an asterisk, a period, and the word "zip"
echo "$var"   # writes *.zip
echo $var     # writes the list of files which end with .zip
</pre>

In fact, the <code>echo</code> command cannot be used with absolute safety here. If the variable contains <code>-n</code> for example, <code>echo</code> will consider that an option, rather than data to be printed. The only absolutely ''sure'' way to print the value of a variable is using <code>printf</code>:

<pre>
printf "%s\n" "$foo"
</pre>

<span id="pf15"></span>
== $foo=bar ==
No, you don't assign a variable by putting a <code>$</code> in front of the variable name. This isn't perl.

<span id="pf16"></span>
== foo = bar ==
No, you can't put spaces around the <code>=</code> when assigning to a variable. This isn't C. When you write <code>foo = bar</code> the shell splits it into three words. The first word, <code>foo</code>, is taken as the command name. The second and third become the arguments to that command.

Likewise, the following are also wrong:

<pre>
foo= bar    # WRONG!
foo =bar    # WRONG!
$foo = bar; # COMPLETELY WRONG!

foo=bar     # Right.
foo="bar"   # More Right.
</pre>

<span id="pf17"></span>
== echo <<EOF ==
A here document is a useful tool for embedding large blocks of textual data in a script. It causes a redirection of the lines of text in the script to the standard input of a command. Unfortunately, <code>echo</code> is not a command which reads from stdin.

<pre>
# This is wrong:
echo <<EOF
Hello world
How's it going?
EOF

# This is what you were trying to do:
cat <<EOF
Hello world
How's it going?
EOF

# Or, use quotes which can span multiple lines (efficient, echo is built-in):
echo "Hello world
How's it going?"
</pre>

Using quotes like that is fine — it works great, in all shells — but it doesn't let you just drop a block of lines into the script.  There's syntactic markup on the first and last line.  If you want to have your lines untouched by shell syntax, and don't want to spawn a <code>cat</code> command, here's another alternative:

<pre>
# Or use printf (also efficient, printf is built-in):
printf %s "\
Hello world
How's it going?
"
</pre>

In the <code>printf</code> example, the <code>\</code> on the first line prevents an extra newline at the beginning of the text block.  There's a literal newline at the end (because the final quote is on a new line).  The lack of <code>\n</code> in the printf format argument prevents <code>printf</code> from adding an extra newline at the end.  The <code>\</code> trick won't work in single quotes.  If you need/want single quotes around the block of text, you have two choices, both of which necessitate shell syntax "contaminating" your data:

<pre>
printf %s \
'Hello world
'

printf %s 'Hello world
'
</pre>

<span id="pf18"></span>
== su -c 'some command' ==
This syntax is ''almost'' correct. The problem is, on many platforms, <code>su</code> takes a <code>-c</code> argument, but it's not the one you want. For example, on OpenBSD:

<pre>
$ su -c 'echo hello'
su: only the superuser may specify a login class
</pre>

You want to pass <code>-c 'some command'</code> to a shell, which means you need a username before the <code>-c</code>.

<pre>
su root -c 'some command' # Now it's right.
</pre>

<code>su</code> assumes a username of root when you omit one, but this falls on its face when you want to pass a command to the shell afterward. You must supply the username in this case.

<span id="pf19"></span>
== cd /foo; bar ==
If you don't check for errors from the <code>cd</code> command, you might end up executing <code>bar</code> in the wrong place. This could be a major disaster, if for example <code>bar</code> happens to be <code>rm -f *</code>.

You must '''always''' check for errors from a <code>cd</code> command. The simplest way to do that is:

<pre>
cd /foo && bar
</pre>

If there's more than just one command after the <code>cd</code>, you might prefer this:

<pre>
cd /foo || exit 1
bar
baz
bat … # Lots of commands.
</pre>

<code>cd</code> will report the failure to change directories, with a stderr message such as "bash: cd: /foo: No such file or directory". If you want to add your own message in stdout, however, you could use command grouping:

<pre>
cd /net || { echo >&2 "Can't read /net. Make sure you've logged in to the Samba network, and try again."; exit 1; }
do_stuff
more_stuff
</pre>

Note there's a required space between <code>{</code> and <code>echo</code>, and a required <code>;</code> before the closing <code>}</code>.  You could also write a <code>die</code> function, if you prefer.

Some people also like to enable [[BashFAQ/105|set -e]] to make their scripts abort on ''any'' command that returns non-zero, but this can be [[BashFAQ/105|rather tricky to use correctly]] (since many common commands may return a non-zero for a warning condition, which you may not want to treat as fatal).

By the way, if you're changing directories a lot in a Bash script, be sure to read the Bash help on <code>pushd</code>, <code>popd</code>, and <code>dirs</code>. Perhaps all that code you wrote to manage <code>cd</code>'s and <code>pwd</code>'s is completely unnecessary.

Speaking of which, compare this:

<pre>
find … -type d -print0 | while IFS= LC_ALL=C read -r -d '' subdir; do
  here=$PWD
  cd "$subdir" && whatever && …
  cd "$here"
done
</pre>

With this:

<pre>
find … -type d -print0 | while IFS= LC_CTYPE=C read -r -d '' subdir; do
  (CDPATH= cd -P -- "$subdir" || exit; whatever; …)
done
</pre>

Forcing a [[SubShell]] here causes the <code>cd</code> to occur only in the subshell; for the next iteration of the loop, we're back to our normal location, regardless of whether the <code>cd</code> succeeded or failed.  We don't have to change back manually, and we aren't stuck in a neverending string of <code>… && …</code> logic preventing the use of other conditionals.  The subshell version is simpler and cleaner (albeit a tiny bit slower). (also note the added <code>CDPATH=</code>, <code>-P</code> and <code>--</code> to make it more likely that <code>cd</code> will do a straight <code>chdir()</code>).

Another approach is to <code>cd</code> unconditionally to where we're supposed to be, at the start of each loop iteration:

<pre>
here=$PWD
find … -type d -print0 | while IFS= LC_ALL=C read -r -d '' subdir; do
   cd "$here" || continue
   CDPATH= cd -P -- "$subdir" || continue
   whatever
   …
done
</pre>

At least this way, we can <code>continue</code> to the next loop iteration and don't have to string an indefinite series of <code>&&</code> together to ensure that we reach the <code>cd</code> at the end of the loop body.

<span id="pf20"></span>
== [ bar == "$foo" ] ==
The <code>==</code> operator is not valid for the POSIX <code>[</code> command. Use <code>=</code> or the [[BashFAQ/031|[[ keyword]] instead.

<pre>
[ bar = "$foo" ] && echo yes
[[ bar == $foo ]] && echo yes
</pre>

In Bash, <code>[ "$x" == y ]</code> is accepted as an extension, which often leads Bash programmers to think it's the correct syntax.  It's not; it's a [[Bashism]].  If you're going to use Bashisms, you might as well just use <code><nowiki>[[</nowiki></code> instead.

<span id="pf21"></span>
== for i in {1..10}; do ./something &; done ==
You ''cannot'' put a <code>;</code> immediately after an <code>&</code>. Just remove the extraneous <code>;</code> entirely.

<pre>
 for i in {1..10}; do ./something & done
</pre>

Or:

<pre>
 for i in {1..10}; do
   ./something &
 done
</pre>

<code>&</code> already functions as a command terminator, just like <code>;</code> does. And you cannot mix the two.

In general, a <code>;</code> can be replaced by a newline, but not all newlines can be replaced by <code>;</code>.

<span id="pf22"></span>
== cmd1 && cmd2 || cmd3 ==
Some people try to use <code>&&</code> and <code>||</code> as a shortcut syntax for <code>if … then … else … fi</code>, perhaps because they think they are being clever. For instance,

<pre>
 # WRONG!
 [[ -s $errorlog ]] && echo "Uh oh, there were some errors." || echo "Successful."
</pre>

However, this construct is ''not'' completely equivalent to <code>if … fi</code> in the general case.  The command that comes after the <code>&&</code> also generates an exit status, and if that exit status isn't "true" (0), then the command that comes after the <code>||</code> will ''also'' be invoked. For example:

<pre>
 i=0
 true && ((i++)) || ((i--))  # WRONG!
 echo "$i"                   # Prints 0
</pre>

What happened here? It looks like <code>i</code> should be 1, but it ends up 0. Why? Because both the <code>i++</code> ''and'' the <code>i--</code> were executed. The <code>((i++))</code> command has an exit status, and that exit status is derived from a C-like evaluation of the expression inside the parentheses. That expression's value happens to be 0 (the initial value of <code>i</code>), and in C, an expression with an integer value of 0 is considered ''false''. So <code>((i++))</code> (when <code>i</code> is 0) has an exit status of 1 (false), and therefore the <code>((i--))</code> command is executed as well.

Another clever person thinks that we can fix it by using the pre-increment operator, since the exit status from <code>++i</code> (with <code>i</code> initially 0) is true:

<pre>
 i=0
 true && (( ++i )) || (( --i ))  # STILL WRONG!
 echo "$i"                       # Prints 1 by dumb luck
</pre>

But that's missing the point of the example. It just ''happens'' to work by ''coincidence'', and you ''cannot'' rely on <code>x && y || z</code> if <code>y</code> has '''any''' chance of failure! (This example still fails if we initialize <code>i</code> to -1 instead of 0.)

If you need safety, or if you simply aren't sure how this works, or if ''anything'' in the preceding paragraphs wasn't completely clear, please just use the simple <code>if … fi</code> syntax in your programs.

<pre>
 i=0
 if true; then
   ((i++))
 else
   ((i--))
 fi
 echo "$i"    # Prints 1
</pre>

This section also applies to Bourne shell, here is the code that illustrates it:

<pre>
 # WRONG!
 true && { echo true; false; } || { echo false; true; }
</pre>

Output is two lines "true" and "false", instead the single line "true".

<span id="pf23"></span>
== echo "Hello World!" ==
The problem here is that, in an interactive Bash shell (in versions prior to 4.3), you'll see an error like:

<pre>
bash: !": event not found
</pre>

This is because, in the default settings for an interactive shell, Bash performs csh-style history expansion using the exclamation point. This is '''not''' a problem in shell scripts; only in interactive shells.

Unfortunately, the obvious attempt to "fix" this won't work:

<pre>
$ echo "hi\!"
hi\!
</pre>

The easiest solution is unsetting the <code>histexpand</code> option: this can be done with <code>set +H</code> or <code>set +o histexpand</code>

: Question: Why is playing with <code>histexpand</code> more apropriate than single quotes?
:: ''I personally ran into this issue when I was manipulating song files, using commands like''
 <pre>
mp3info -t "Don't Let It Show" …
mp3info -t "Ah! Leah!" …
</pre>
:: ''Using single quotes is extremely inconvenient because of all the songs with apostrophes in their titles. Using double quotes ran into the history expansion issue. (And imagine a file that has both in its name. The quoting would be atrocious.) Since I never actually ''use'' history expansion, my personal preference was to turn it off in <code>~/.bashrc</code>.'' — GreyCat

These solutions will work:

<pre>
echo 'Hello World!'
</pre>

or

<pre>
echo "Hello World"!
</pre>

or

<pre>
set +H
echo "Hello World!"
</pre>

or

<pre>
histchars=
</pre>

Many people simply choose to put <code>set +H</code> or <code>set +o histexpand</code> in their <code>~/.bashrc</code> to deactivate history expansion permanently. This is a personal preference, though, and you should choose whatever works best for you.

Another solution is:

<pre>
exmark='!'
echo "Hello, world$exmark"
</pre>

In Bash 4.3 and newer, a double quote following <code>!</code> no longer triggers history expansion, but history expansion is still performed within double quotes, so while <code>echo "Hello World!"</code> is OK, these will still be a problem:

<pre>
echo "Hello, World!(and the rest of the Universe)"
echo "foo!'bar'"
</pre>

<span id="pf24"></span>
== for arg in $* ==
Bash (like all Bourne shells) has a special syntax for referring to the list of positional parameters one at a time, and <code>$*</code> isn't it. Neither is <code>$@</code>. Both of those expand to the list of words in your script's parameters, not to each parameter as a separate word.

The correct syntax is:

<pre>
for arg in "$@"

# Or simply:
for arg
</pre>

Since looping over the positional parameters is such a common thing to do in scripts, <code>for arg</code> defaults to <code>for arg in "$@"</code>. The double-quoted <code>"$@"</code> is special magic that causes each parameter to be used as a single word (or a single loop iteration). It's what you should be using at least 99% of the time.

Here's an example:

<pre>
# Incorrect version
for x in $*; do
  echo "parameter: '$x'"
done

$ ./myscript 'arg 1' arg2 arg3
parameter: 'arg'
parameter: '1'
parameter: 'arg2'
parameter: 'arg3'
</pre>

It should have been written:

<pre>
# Correct version
for x in "$@"; do
  echo "parameter: '$x'"
done

# or better:
for x do
  echo "parameter: '$x'"
done

$ ./myscript 'arg 1' arg2 arg3
parameter: 'arg 1'
parameter: 'arg2'
parameter: 'arg3'
</pre>

<span id="pf25"></span>
== function foo() ==
This works in some shells, but not in others. You should ''never'' combine the keyword <code>function</code> with the parentheses <code>()</code> when defining a function.

Bash (at least some versions) will allow you to mix the two. Most of the shells won't accept that (zsh 4.x and perhaps above will - for example). Some shells will accept <code>function foo</code>, but for maximum portability, you should always use:

<pre>
foo() {
 …
}
</pre>

<span id="pf26"></span>
== echo "~" ==
Tilde expansion only applies when '~' is unquoted. In this example echo writes '~' to stdout, rather than the path of the user's home directory.

Quoting path parameters that are expressed relative to a user's home directory should be done using $HOME rather than '~'. For instance consider the situation where $HOME is "/home/my photos".

<pre>
"~/dir with spaces" # expands to "~/dir with spaces"
~"/dir with spaces" # expands to "~/dir with spaces"
~/"dir with spaces" # expands to "/home/my photos/dir with spaces"
"$HOME/dir with spaces" # expands to "/home/my photos/dir with spaces"
</pre>

<span id="pf27"></span>
== local var=$(cmd) ==
When declaring a local variable in a function, the <code>local</code> acts as a command in its own right. This can sometimes interact oddly with the rest of the line — for example, if you wanted to capture the exit status (<code>$?</code>) of the CommandSubstitution, you can't do it. <code>local</code>'s exit status masks it.

Another problem with this syntax is that in some shells (like bash), <code>local var=$(cmd)</code> is treated as an ''assignment'', meaning the right hand side is given special treatment, just like <code>var=$(cmd)</code>; while in other shells, <code>local var=$(cmd)</code> is '''not''' treated as an assignment, and the right hand side will undergo [[WordSplitting|word splitting]] (because it isn't quoted).

Quoting the right hand side will work around the word splitting issue, but not the exit status masking issue.  For both reasons, it's best to use separate commands for this:

<pre>
local var
var=$(cmd)
rc=$?
</pre>

Both issues are also true of <code>export</code> and <code>readonly</code>.

The next pitfall describes another issue with this syntax:

<span id="pf28"></span>
== export foo=~/bar ==
[[TildeExpansion|Tilde expansion]] (with or without a username) is only guaranteed to occur when the tilde appears at the beginning of a [[Arguments|word]], either by itself or followed by a slash.  It is also guaranteed to occur when the tilde appears immediately after the <code>=</code> in an assignment.

However, the <code>export</code> and <code>local</code> commands do '''not''' necessarily constitute an assignment.  In some shells (like bash), <code>export foo=~/bar</code> will undergo tilde expansion; in others, it will not.

<pre>
 foo=~/bar; export foo    # Right!
 export foo="$HOME/bar"   # Right!
</pre>

Using parameter expansion instead of tilde expansion lets us further improve it to:

<pre>
 export foo="${HOME%/}/bar" # Better!
</pre>

Which yields <code>/bar</code> instead of <code>//bar</code> when <code>$HOME</code> is <code>/</code> (which used to be common for the <code>root</code> user at least) which is better as on some systems, paths that start with a double-slash have a special meaning.

<span id="pf29"></span>
== sed 's/$foo/good bye/' ==
In [[Quotes|single quotes]], bash parameter expansions like <code>$foo</code> do not get expanded.  That is the purpose of single quotes, to protect characters like <code>$</code> from the shell.

Changing the quotes to double quotes makes it work sometimes:

<pre>
 foo="hello"; sed "s/$foo/good bye/"
</pre>

But keep in mind, if you use double quotes you might need to use more escapes.  There's also a security risk here, if the contents of <code>$foo</code> are not under your control.  See the [[Quotes]] and [[CodeInjection]] pages.

<span id="pf30"></span>
== tr [A-Z] [a-z] ==
There are (at least) three things wrong here.  The first problem is that <code>[A-Z]</code> and <code>[a-z]</code> are seen as [[glob]]s by the shell.  If you don't have any single-lettered filenames in your current directory, it'll seem like the command is correct; but if you do, things will go wrong.  Probably at 0300 hours on a weekend.

The second problem is that this is not really the correct notation for <code>tr</code>.  What this actually does is translate '[' into '['; anything in the range A-Z into a-z; and ']' into ']'.  So you don't even need those brackets, and the first problem goes away.

The third problem is that depending on the [[locale]], A-Z or a-z may not give you the 26 ASCII characters you were expecting.  In fact, in some locales z is in the middle of the alphabet!  The solution to this depends on what you want to happen:

<pre>
# Use this if you want to change the case of the 26 latin letters
LC_COLLATE=C tr A-Z a-z

# Use this if you want the case conversion to depend upon the locale,
# which might be more like what a user is expecting.
tr '[:upper:]' '[:lower:]'
</pre>

The quotes are required on the second command, to avoid [[glob|globbing]].

<span id="pf31"></span>
== ps ax | grep gedit ==
The fundamental problem here is that the name of a running process is inherently unreliable.  There could be more than one legitimate gedit process.  There could be something else disguising itself as gedit (changing the reported name of an executed command is trivial).  For ''real'' answers to this, see [[ProcessManagement]].

The following is the quick and dirty stuff.

Searching for the PID of (for example) gedit, many people start with

<pre>
$ ps ax | grep gedit
10530 ?        S      6:23 gedit
32118 pts/0    R+     0:00 grep gedit
</pre>
which, depending on a RaceCondition, often yields grep itself as a result.  To filter grep out:

<pre>
ps ax | grep -v grep | grep gedit   # will work, but ugly
</pre>
An alternative to this is to use:

<pre>
ps ax | grep '[g]edit'              # quote to avoid shell GLOB
</pre>
This will ignore the grep itself in the process table as that is [g]edit and grep is looking for gedit once evaluated.

On GNU/Linux, the parameter -C can be used instead to filter by commandname:

<pre>
$ ps -C gedit
  PID TTY          TIME CMD
10530 ?        00:06:23 gedit
</pre>
But why bother when you could just use pgrep instead?

<pre>
$ pgrep gedit
10530
</pre>
Now in a second step the PID is often extracted by awk or cut:

<pre>
$ ps -C gedit | awk '{print $1}' | tail -n1
</pre>
but even that can be handled by some of the trillions of parameters for ps:

<pre>
$ ps -C gedit -opid=
10530
</pre>
If you're stuck in 1992 and aren't using pgrep, you could use the ancient, obsolete, deprecated pidof (GNU/Linux only) instead:

<pre>
$ pidof gedit
10530
</pre>
and if you need the PID to kill the process, ''pkill'' might be interesting for you. Note however that, for example, <code>pgrep/pkill ssh</code> would also find processes named sshd, and you wouldn't want to kill those.

Unfortunately some programs aren't started with their name, for example firefox is often started as firefox-bin, which you would need to find out with — well — '''ps ax | grep firefox'''. :) Or, you can stick with pgrep by adding some parameters:

<pre>
$ pgrep -fl firefox
3128 /usr/lib/firefox/firefox
7120 /usr/lib/firefox/plugin-container /usr/lib/flashplugin-installer/libflashplayer.so -greomni /usr/lib/firefox/omni.ja 3128 true plugin
</pre>
Please read [[ProcessManagement]].  Seriously.

<span id="pf32"></span>
== printf "$foo" ==
This isn't wrong because of [[Quotes|quotes]], but because of a ''format string exploit''.  If <code>$foo</code> is not strictly under your control, then any <code>\</code> or <code>%</code> characters in the variable may cause undesired behavior.

Always supply your own format string:

<pre>
printf %s "$foo"
printf '%s\n' "$foo"
</pre>

<span id="pf33"></span>
== for i in {1..$n} ==
The [[BashParser]] performs [[BraceExpansion]] ''before'' any other expansions or substitutions.  So the brace expansion code sees the literal <code>$n</code>, which is not numeric, and therefore it doesn't expand the curly braces into a list of numbers.  This makes it nearly impossible to use brace expansion to create lists whose size is only known at run-time.

Do this instead:

<pre>
for ((i=1; i<=n; i++)); do
…
done
</pre>
In the case of simple iteration over integers, an arithmetic <code>for</code> loop should almost always be preferred over brace expansion to begin with, because brace expansion pre-expands every argument which can be slower and unnecessarily consumes memory.

<span id="pf34"></span>
== if <nowiki>[[ $foo = $bar ]]</nowiki> (depending on intent) ==
When the right-hand side of an <code>=</code> operator inside [[BashFAQ/031|&#91;&#91;]] is not quoted, bash does [[glob|pattern matching]] against it, instead of treating it as a string.  So, in the code above, if <code>bar</code> contains <code>*</code>, the result will ''always'' be true.  If you want to check for equality of strings, the right-hand side should be quoted:

<pre>
if [[ $foo = "$bar" ]]
</pre>

If you want to do pattern matching, it might be wise to choose variable names that indicate the right-hand side contains a pattern.  Or use comments.

It's also worth pointing out that if you quote the right-hand side of <code>=~</code> it ''also'' forces a simple string comparison, rather than a regular expression matching.  This leads us to:

<span id="pf35"></span>
== if <nowiki>[[ $foo =~ 'some RE' ]]</nowiki> ==
The quotes around the right-hand side of the <code>=~</code> operator cause it to become a string, rather than a [[RegularExpression]].  If you want to use a long or complicated regular expression and avoid lots of backslash escaping, put it in a variable:

<pre>
re='some RE'
if [[ $foo =~ $re ]]
</pre>

This also works around the difference in how <code>=~</code> works across different versions of bash.  Using a variable avoids some nasty and subtle problems.

The same problem occurs with [[glob|pattern matching]] inside <code><nowiki>[[</nowiki></code>:

<pre>
[[ $foo = "*.glob" ]]      # Wrong! *.glob is treated as a literal string.
[[ $foo = *.glob ]]        # Correct. *.glob is treated as a glob-style pattern.
</pre>

<span id="pf36"></span>
== [ -n $foo ] or [ -z $foo ] ==
When using the <code>[</code> command, you '''must''' [[Quotes|quote]] each substitution that you give it.  Otherwise, <code>$foo</code> could expand to 0 words, or 42 words, or any number of words that isn't 1, which breaks the syntax.

<pre>
[ -n "$foo" ]
[ -z "$foo" ]
[ -n "$(some command with a "$file" in it)" ]

# [[ doesn't perform word-splitting or glob expansion, so you could also use:
[[ -n $foo ]]
[[ -z $foo ]]
</pre>

<span id="pf37"></span>
== <nowiki>[[ -e "$broken_symlink" ]]</nowiki> returns 1 even though $broken_symlink exists ==
<code>test</code> follows symlinks, therefore if a symlink is broken, i.e. it points to a file that doesn't exists or is in a directory you don't have access to, test -e returns 1 for it even though it exists.

In order to work around it (and prepare against it) you should use:

<pre>
# bash/ksh/zsh
[[ -e "$broken_symlink" || -L "$broken_symlink" ]]

# POSIX sh+test
[ -e "$broken_symlink" ] || [ -L "$broken_symlink" ]
</pre>

<span id="pf38"></span>
== ed file <<<"g/d\{0,3\}/s//e/g" fails ==
The problem caused because ed doesn't accept 0 for \{0,3\}.

You can check that the following do work:

<pre>
ed file <<<"g/d\{1,3\}/s//e/g"
</pre>

Note that this happens even though POSIX states that BRE (which is the Regular Expression flavor used by ed) [http://www.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03_06 should accept 0 as the minimum number of occurrences (see section 5)].

<span id="pf39"></span>
== expr sub-string fails for "match" ==
This works reasonably well most of the time

<pre>
word=abcde
expr "$word" : ".\(.*\)"
bcde
</pre>

But WILL fail for the word "match"

<pre>
word=match
expr "$word" : ".\(.*\)"
</pre>

The problem is "match" is a keyword. Solution (GNU only) is prefix with a '+'

<pre>
word=match
expr + "$word" : ".\(.*\)"
atch
</pre>

Or, y'know, stop using <code>expr</code>.  You can do everything <code>expr</code> does by using [[BashFAQ/073|Parameter Expansion]].  What's that thing up there trying to do?  Remove the first letter of a word?  That can be done in POSIX shells using Parameter Expansion, or in bash with Substring Expansion:

<pre>
$ word=match
$ echo "${word#?}"    # Parameter Expansion
atch
$ echo "${word:1}"    # Substring Expansion
atch
</pre>

Seriously, there's no excuse for using <code>expr</code> unless you're on Solaris with its non-POSIX-conforming <code>/bin/sh</code>.  It's an external process, so it's much slower than in-process string manipulation.  And since nobody uses it, nobody understands what it's doing, so your code is obfuscated and hard to maintain.

<span id="pf40"></span>
== On UTF-8 and Byte-Order Marks (BOM) ==
'''In general:''' Unix UTF-8 text does not use BOM. The encoding of plain text is determined by the locale or by mime types or other metadata. While the presence of a BOM would not normally damage a UTF-8 document meant only for reading by humans, it is problematic (often syntactically illegal) in any text file meant to be interpreted by automated processes such as scripts, source code, configuration files, and so on. Files starting with BOM should be considered equally foreign as those with MS-DOS linebreaks.

'''In shell scripting:''' 'Where UTF-8 is used transparently in 8-bit environments, the use of a BOM will interfere with any protocol or file format that expects specific ASCII characters at the beginning, such as the use of "#!" of at the beginning of Unix shell scripts.' http://unicode.org/faq/utf_bom.html#bom5

<span id="pf41"></span>
== content=$(<file) ==
There isn't anything wrong with this expression, but you should be aware that command substitutions (all forms: <code>`…`</code>, <code>$(…)</code>, <code>$(<file)</code>, <code>`<file`</code>, and <code>${ …; }</code> (ksh/bash5.3)) remove any trailing newlines. This is often inconsequential or even desirable, but if you must preserve the literal output including any possible trailing newlines, it gets tricky because you have no way of knowing whether the output had them or how many. One ugly but usable workaround is to add a postfix inside the command substitution and remove it on the outside:

<pre>
absolute_dir_path_x=$(readlink -fn -- "$dir_path"; printf x)
absolute_dir_path=${absolute_dir_path_x%x}
</pre>
A less portable but arguably prettier solution is to use <code>read</code> with an empty delimiter.

<pre>
# Ksh93u+m, zsh (or bash 4.2+ with lastpipe enabled and non-interactive)
readlink -fn -- "$dir_path" | IFS= LC_ALL=C read -rd '' absolute_dir_path
</pre>
The downside to this method is that the <code>read</code> will always return false unless the command outputs a NUL byte causing only part of the stream to be read. The only way to get the exit status of the command is through <code>PIPESTATUS</code>. You could also intentionally output a NUL byte to force <code>read</code> to return true, and use <code>pipefail</code>.

<pre>
set -o pipefail
{ readlink -fn -- "$dir_path" && printf '\0'; } | IFS= LC_ALL=C read -rd '' absolute_dir_path
set +o pipefail
</pre>
This is somewhat of a portability mess, as Bash supports both <code>pipefail</code> and <code>PIPESTATUS</code>, zsh has <code>pipestatus</code> instead of <code>PIPESTATUS</code> and ksh93u+m supports <code>pipefail</code> only, and only recent versions of mksh support <code>pipefail</code>, while earlier versions supported <code>PIPESTATUS</code> only. Additionally, a recent of ksh93u+m version is required in order for <code>read</code> to handle <code><nowiki>-d ''</nowiki></code>.

<span id="pf42"></span>
== for file in ./* ; do if <nowiki>[[ $file != *.* ]]</nowiki> ==
One way to prevent programs from interpreting filenames passed to them as options is to use pathnames (see [[#pf3|pitfall #3]] above). For files under the current directory, names may be prefixed with a relative pathname <code>./</code>.

In the case of a pattern like <code>*.*</code> however, problems can arise because it matches a string of the form <code>./filename</code>. In a simple case, you can just use the glob directly to generate the desired matches. If however a separate pattern-matching step is required (e.g. the results have been preprocessed and stored in an array, and need to be filtered), it could be solved by taking the prefix into account in the pattern: <code><nowiki>[[ $file != ./*.* ]]</nowiki></code>, or by stripping the pattern from the match.

<pre>
# Bash
shopt -u failglob; shopt -s nullglob
for path in ./*; do
    if [[ ${path##*/} != *.* ]]; then
        rm "$path"
    fi
done

# Or even better
for file in *; do
    if [[ $file != *.* ]]; then
        rm "./$file"
    fi
done
</pre>

Another possibility is to signal the ''end of options'' with a <code>--</code> argument, instead of using the <code>./</code> prefix. (Again, covered in [[#pf3|pitfall #3]].)

<pre>
shopt -u failglob; shopt -s nullglob
for file in *; do
    if [[ $file != *.* ]]; then
        rm -- "$file"
    fi
done
</pre>

Finally, bash's [[glob|extglob]] can be used to generate the desired list of filenames directly:

<pre>
shopt -s extglob
for file in !(*.*); do
    rm -- "$file"
done
</pre>

<span id="pf43"></span>
== somecmd 2>&1 >>logfile ==
This is by far the most common mistake involving redirections. Typically, someone wanting to direct both stdout and stderr to a file or pipe will try this and not understand why stderr is ''still'' showing up on their terminal. If you're perplexed by this, you probably don't understand how [http://wiki.bash-hackers.org/howto/redirection_tutorial redirections] or possibly [[FileDescriptor|file descriptors]] work to begin with. Redirections are evaluated left-to-right before the command is executed. This semantically incorrect code essentially means: "first redirect standard error to where standard out is currently pointing (the tty), then redirect standard out to logfile". This is backwards. Standard error is already going to the tty. Use the following instead:

<pre>
somecmd >>logfile 2>&1
</pre>
See [[BashFAQ/055|a more in-depth explanation]], [http://wiki.bash-hackers.org/scripting/copydescriptor Copy descriptor explained], and [[BashGuide/InputAndOutput#Redirection|BashGuide - redirection]].

<span id="pf44"></span>
== cmd; (( ! $? )) || die ==
<code>$?</code> is only required if you need to retrieve the exact status of the previous command. If you only need to test for success or failure (any non-zero status), just test the command directly. e.g.:

<pre>
if cmd; then
    …
fi
</pre>
Checking an exit status against a list of alternatives might follow a pattern like this:

<pre>
cmd
status=$?
case $status in
    0)
        echo success >&2
        ;;
    1)
        echo 'Must supply a parameter, exiting.' >&2
        exit 1
        ;;
    *)
        echo "Unknown error $status, exiting." >&2
        exit "$status"
esac
</pre>

<span id="pf45"></span>
== y=$(( array[$x] )) ==
This pitfall occurs in any context in which an array's name and index are subject to word expansions before being evaluated as a name literal. [[#pf61|Pitfall 61]] and [[#pf62|62]] are the consequence of the exact same mechanisms.

The code given to an arithmetic expansion or compound command undergoes an initial pass of expansions and substitutions to generate the text to be parsed and evaluated as an [[ArithmeticExpression|arithmetic expression]]. ''This must be handled carefully.''

For example, this expression is stitched together by expanding one code fragment into another.

<pre>
$ x='$(date >&2)'        # redirection is just so we can see everything happen
$ y=$((array["$x"]))     # Quotes don't help. The array doesn't even have to exist
Mon Jun  2 10:49:08 EDT 2014
</pre>

Next, the expanded string is passed to the arithmetic processor, which will need to get a reference to the array variable in the shell's internal symbol table using a lookup function to resolve the variable's "name". This name resolver takes a string - <code>array[$(date >&2)]</code> - consisting of the name, including the index and all literal code within brackets, just like e.g. <code>read</code> or <code>printf -v</code> do with variable names passed as arguments. The variable resolver performs expansions, ''including command substitution'', to resolve the index.

(For numeric indexed arrays, the lookup function next evaluates the expanded text of the index as an arithmetic expression. Consequently, mutually recursive variable lookups and arithmetic expansions can occur to any depth (up to Bash's defined limit), any of which can produce unintended side-effects.)

Most of the time, there is no need to use any kind of expansion within an arithmetic expansion. Use variable names directly in the expression (no <code>$</code>) wherever possible (i.e. except for positional parameters and POSIX "special variables"). Validate variables before using them and assure no expansion generates anything but a numeric literal - most issues are automatically avoided.

Escape any expansions to pass them into the expression without expanding them first:

<syntaxhighlight lang="bash">
# Typical task reading some columns into an associative array.
typeset -A arr
printf -v offset '%(%s)T' -1

while IFS=' ' read -r x y; do
    # validate input (see next pitfall)
    [[ "$x $y" == +([0123456789])' '+([0123456789]) ]] || continue
    # Escaped substitution passes the entire expression literally.
    (( arr[\$(date -d "@$x" +%F)] = y - offset ))
done
</syntaxhighlight>

Another option is to use <code>let</code> with single-quoted arguments. <code>((expr))</code> is equivalent to <code>let "expr"</code> (double-quoted args).

<span id="pf46"></span>
== read num; echo $((num+1)) ==
Always validate your input (see [[BashFAQ/054]]) before using num in an arithmetic context as it allows [[CodeInjection]].

<pre>
$ echo 'a[$(echo injection >&2)]' | bash -c 'read num; echo $((num+1))'
injection
1
</pre>

<span id="pf47"></span>
== IFS=, read -ra fields <<< "$csv_line" ==
Unbelievable as it may seem, POSIX requires the treatment of [[IFS]] as a field ''terminator'', rather than a field ''separator''.  What this means in our example is that if there's an empty field at the end of the input line, it will be discarded:

<pre>
$ IFS=, read -ra fields <<< "a,b,"
$ declare -p fields
declare -a fields='([0]="a" [1]="b")'
</pre>

Where did the empty field go?  It was eaten for historical reasons ("because it's always been that way").  This behavior is not unique to bash; all conformant shells do it.  A non-empty field is properly scanned:

<pre>
$ IFS=, read -ra fields <<< "a,b,c"
$ declare -p fields
declare -a fields='([0]="a" [1]="b" [2]="c")'
</pre>

So, how do we work around this nonsense?  As it turns out, appending an IFS character to the end of the input string will force the scanning to work.  If there was a trailing empty field, the extra IFS character "terminates" it so that it gets scanned.  If there was a trailing non-empty field, the IFS character creates a new, empty field that gets dropped.

<pre>
$ input="a,b,"
$ IFS=, read -ra fields <<< "$input,"
$ declare -p fields
declare -a fields='([0]="a" [1]="b" [2]="")'
</pre>

The same issue may appear when we use <code>read</code> with a fixed number of field variables, and we wish to get the rest of the line, with no alterations, into the final variable.  The shell thwarts us.

<pre>
$ echo 'foo:bar:' | { IFS=: read -r f1 rest; declare -p f1 rest; }
declare -- f1="foo"
declare -- rest="bar"
</pre>

The trailing <code>:</code> has been stripped off.  This only happens when there is precisely ''one'' extra separator in the rest of the line, and it's the final character.  In all other cases, the pitfall remains untriggered.

<pre>
$ echo 'foo:bar:f' | { IFS=: read -r f1 rest; declare -p rest; }
declare -- rest="bar:f"
$ echo 'foo:bar::' | { IFS=: read -r f1 rest; declare -p rest; }
declare -- rest="bar::"
</pre>

This allows the problem to go undetected for ''ages'' before finally striking.

To work around this behavior, we can add an extra separator character to the end of the line, and then remove it afterward.

<pre>
$ input='foo:bar:'
$ echo "$input:" | { IFS=: read -r f1 rest; rest=${rest%:}; declare -p rest; }
declare -- rest="bar:"
</pre>

<span id="pf48"></span>
== export CDPATH=.:~/myProject ==
Do not export CDPATH.

Setting CDPATH in .bashrc is not an issue, but exporting it will cause any bash or sh script you run, that happen to use <code>cd</code>, to potentially change behaviour.

There are two problems. A script that does the following:

<pre>
cd some/dir || exit
cmd to be run in some/dir
</pre>
may change directory to <code>~/myProject/some/dir</code> instead of <code>./some/dir</code>, depending on what directories exist at the time. So the <code>cd</code> may succeed and take the script to the wrong directory, with potentially harmful effects of the following commands which now run in a different directory than intended.

The second problem is when <code>cd</code> is run in a context where the output is captured:

<pre>
output=$(cd some/dir && some command)
</pre>
As a side-effect when CDPATH is set, <code>cd</code> will output something like <code>/home/user/some/dir</code> to stdout to indicate that it found a directory through CDPATH, which in turn will end up in the output variable along with the intended output of <code>some command</code>.

A script can make itself immune to a CDPATH inherited from the environment by always prepending <code>./</code> to relative paths, or run <code>unset CDPATH</code> at the start of the script, but don't assume every scripter has taken this pitfall into account, so don't export CDPATH.

<span id="pf49"></span>
== OIFS="$IFS"; …; IFS="$OIFS" ==
Copying a variable's value to a temporary variable isn't enough to preserve its state. An assignment will result in a ''set'' but ''empty'' temporary variable even if the initial variable was unset. This is a particular problem for IFS because an ''empty'' IFS has a completely different meaning from an ''unset'' IFS, and setting IFS to a temporary value for a command or two is a common requirement.

One workaround is to designate a prefix to distinguish set from unset vars, then strip it when finished.

<pre>
oIFS=${IFS+_${IFS}}
IFS=/; printf %s\\n "${array[*]}"
${oIFS:+'false'} unset -v IFS || IFS=${oIFS#_}
</pre>
A local variable is usually preferable when possible.

<pre>
f() {
  local IFS
  IFS=/; printf %s\\n "${array[*]}"
}
f
</pre>
Subshells are another possibility:

<pre>
( IFS=/; printf %s\\n "${array[*]}" )
</pre>

<span id="pf50"></span>
== hosts=( $(aws …) ) ==
It is not safe to populate an array with a raw <code>$(…)</code> [[CommandSubstitution]].  The output of the command undergoes word splitting (on ''all'' whitespace, even ones that are inside quotes) and then [[glob|globbing]].  If there's a word like <code>*</code> or <code>eh?</code> or <code>[abc]</code> in the result, it will be expanded based on filenames in the current working directory.

To select a replacement, you need to know whether the command writes its output on a single line, or multiple lines.  If it's a single line:

<pre>
read -ra hosts < <(aws …)
</pre>

If it's multiple lines (and you're targeting bash 4.0 or later):

<pre>
readarray -t hosts < <(aws …)
</pre>

If it's multiple lines (and you want compatibility with bash 3.x, ''or'' want your command's exit status to be reflected in success or failure of the <code>read</code> operation without depending on behavior only available in bash 4.4 and newer):

<pre>
IFS=$'\n' read -r -d '' -a hosts < <(aws … && printf '\0')
</pre>

This will prevent globbing.  It still won't help you if you needed to avoid splitting on quoted whitespace, but unfortunately ''nothing'' bash can do handles that case.  For generalized CSV (comma-separated value) file handling, you really need to switch to a language that has a dedicated CSV input library.

<span id="pf51"></span>
== Non-atomic writes with xargs -P ==
GNU <code>xargs</code> supports running multiple jobs in parallel. <code>-P n</code> where '''n''' is the number of jobs to run in parallel.

<pre>
seq 100 | xargs -n1 -P10 echo "$a" | grep 5
seq 100 | xargs -n1 -P10 echo "$a" > myoutput.txt
</pre>

This will work fine for many situations but has a deceptive flaw: If <code>$a</code> contains more than 8192 characters (the limit depends on platform and version), the <code>echo</code> may not be atomic (it may be split into multiple <code>write()</code> calls), and there is a risk that two lines will be mixed.

<pre>
$ perl -e 'print "a"x10000, "\n"' > foo
$ strace -e write bash -c 'read -r foo < foo; echo "$foo"' >/dev/null
write(1, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"…, 8192) = 8192
write(1, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"…, 1809) = 1809
+++ exited with 0 +++
</pre>

Obviously the same issue arises if there are multiple calls to <code>echo</code> or <code>printf</code>:

<pre>
slowprint() {
  printf 'Start-%s ' "$1"
  sleep "$1"
  printf '%s-End\n' "$1"
}
export -f slowprint
seq 10 | xargs -n1 -I {} -P4 bash -c "slowprint {}"
# Compare to no parallelization
seq 10 | xargs -n1 -I {} bash -c "slowprint {}"
# Be sure to see the warnings in the next Pitfall!
</pre>

Outputs from the parallel jobs are mixed together, because each job consists of two (or more) separate <code>write()</code> calls.

If you need the outputs unmixed, it is therefore recommended to use a tool that guarantees output will be serialized (such as GNU Parallel).

For further details see [https://gist.github.com/ole-tange/88ae153797748b3618e2433377e2870a a demonstration of the mixing problem].

<span id="pf52"></span>
== find . -exec sh -c 'echo {}' \; ==
This command contains a [[CodeInjection]] vulnerability.  The filename that is found by <code>find</code> is injected into a shell command and parsed by <code>sh</code>.  If the filename contains shell metacharacters like <code>;</code> or <code>$( … )</code> then the filename may be ''executed as code'' by <code>sh</code>.

The "slowprint" example in the previous Pitfall would have been a CodeInjection bug if the input weren't guaranteed to be integers.

To be more precise, [http://pubs.opengroup.org/onlinepubs/9699919799/utilities/find.html#tag_20_47 POSIX find] does not specify whether an argument which contains ''more than'' just <code>{}</code> is expanded.  GNU <code>find</code> allows this code injection to occur.  Other implementations choose a safer path:

<pre>
# uname -a
HP-UX imadev B.10.20 A 9000/785 2008897791 two-user license
# find /dev/null -exec sh -c 'echo {}' \;
{}
</pre>

The correct approach is to ''separate'' the filename argument from the script argument:

<pre>
find . -exec sh -c 'echo "$1"' x {} \;
</pre>

<span id="pf53"></span>
== sudo mycmd > /myfile ==
[[Redirection]] is done ''before'' the command is executed.  Usually that doesn't matter, but with <code>sudo</code> we have a command being executed as a different user than the redirection.

If the redirection must be executed with <code>sudo</code>-granted privileges, then you need a wrapper:

<pre>
sudo sh -c 'mycmd > /myfile'
</pre>
Instead of a wrapper you can use <code>tee</code>:

<pre>
mycmd | sudo tee /myfile >/dev/null
</pre>
This may be easier to write if <code>mycmd</code> has a lot of quoting.

<span id="pf54"></span>
== sudo ls /foo/* ==
This is very similar to the previous pitfall.  [[glob|Globbing]] is also done ''before'' the command is executed.  If the directory isn't readable by your normal user privileges, then you may need the globbing to be done in a shell that has the <code>sudo</code>-granted privileges:

<pre>
sudo sh -c 'ls /foo/*'
</pre>

<span id="pf55"></span>
== myprogram 2>&- ==
'''Do not''' close stdin, stdout or stderr as a "shorthand" for redirecting to <code>/dev/null</code>.  Write it out correctly.

<pre>
myprogram 2>/dev/null
</pre>
Why?  Consider what happens when your program tries to write an error message to stderr.  If stderr has been redirected to <code>/dev/null</code>, the write succeeds, and your program is free to carry on, secure in the knowledge that it has diligently reported the error condition.

But if stderr has been ''closed'', then the write will fail.  At that point, your program may do something unpredictable.  It may carry on and ignore the failure, or it may immediately exit, considering the execution environment so broken that it cannot safely continue.  Or whatever else the programmer decided the program should do when its world has become a dystopian hell.

All programs are assured that stdin, stdout and stderr will ''exist'' and will be readable/writable in an appropriate and reasonable manner.  By closing one of them, you have violated your promise to this program.  This is not acceptable.

Of course, an even better solution would be to actually log the errors somewhere, so you can go back and read them and figure out what's wrong.

<span id="pf56"></span>
== Using xargs without -0 ==
<code>xargs</code> splits on whitespace. This is unfortunate because whitespace is allowed in filenames and commonly used by GUI users. <code>xargs</code> also treats <code>'</code> and <code>"</code> specially, which can also lead to problems:

<pre>
touch Dad\'s\ \"famous\"\ 1\'\ pizza.txt
touch Dad\'s\ 12\"\ records.txt
touch 2\"x1\'\ wood.txt
touch 2\"x4\"\ wood.txt
</pre>

Here <code>xargs</code> warns:

<pre>
# Do not do this
$ find . -type f | xargs wc
xargs: unmatched single quote; by default quotes are special to xargs unless you use the -0 option
</pre>

Here <code>xargs</code> does not warn at all:

<pre>
# Do not do this
echo * | xargs wc
find *famous* -type f | xargs wc
find *4* -type f | xargs wc
</pre>

Instead use <code>xargs -0</code>:

<pre>
# Do this instead
printf '%s\0' * | xargs -0 wc
find . -type f -name '*famous*' -print0 | xargs -0 wc
find . -type f -name '*4*' -exec wc {} +
</pre>

If using <code>-0</code> is not simple, an alternative is to use GNU Parallel, which splits on \n. And while \n is also allowed in filenames they never occur unless your users are malicious.(*) In any case: '''If''' you use <code>xargs</code> without <code>-0</code> put a comment in your code explaining why that is safe in your particular situation.

(*) In case you hadn't figured it out by now, GNU Parallel has an aggressive marketing team.  They run around promoting GNU Parallel on every wiki they can find, in every context where it ''might'' possibly be useful.  The previous paragraph is an example of this.  Despite knowing that it will break on filenames containing newlines, they just wave that off.  Malice is not the only reason you might see newlines in a filename; simple human error is far more common.

<span id="pf57"></span>
== unset a[0] ==
When passing an [[BashFAQ/005|indexed array element]] to <code>unset</code>, it needs to be quoted.  Otherwise, it may be treated as a [[glob]], and expanded against the files in the current directory.  If there happens to be a file named <code>a0</code> then the glob is expanded to <code>a0</code> and you end up executing <code>unset a0</code>.

It is also generally preferable to specify the <code>-v</code> option when unsetting a variable.  Otherwise, if the variable specified by the argument to <code>unset</code> does not exist, and there happens to be a function with that name, the <code>unset</code> command will unset the function instead of just doing nothing.  This does not seem to happen with bash's <code>unset</code> if the argument contains <code>[...]</code> (you need to use the <code>-f</code> option explictly to unset functions that have <code>[...]</code> in their name), but that is undocumented, so it is best to use <code>-v</code> anyway even when unsetting an array element.

<pre>
unset -v 'a[0]'     # Always quote indexed array elements when unsetting.
</pre>

<span id="pf58"></span>
== month=$(date +%m); day=$(date +%d) ==
Calling <code>date</code> multiple times is a bad idea.  Imagine what happens if the first call occurs a millisecond before midnight on April 30, and the second call occurs a millisecond after midnight on May 1.  You would end up with month=04 and day=01.

It's better to call date ''one'' time, retrieving all of the fields you want in a single invocation.

A common idiom for that:

<pre>
eval "$(date +'month=%m day=%d year=%Y dayname="%A" monthname="%B"')"
</pre>

Or with bash's (4.2 or above) <code>printf</code> builtin:

<pre>
printf -v d '%(month=%m day=%d year=%Y dayname="%A" monthname="%B")T'
eval "$d"
</pre>
Remember things like month or day names are locale-dependent, hence the quotes around <code>%A</code> or <code>%B</code> to avoid problems in locales where day or month names contain spaces or other special characters for the shell.

Or, you may retrieve a timestamp in epoch format (seconds since the start of 1970), and then use that to generate human-readable date/time fields as needed.

<pre>
# Requires bash 4.2 or above
printf -v now '%(%s)T' -1        # Or now=$EPOCHSECONDS in bash 5.0
                                 # -1 may be omitted in 4.3 or above
printf -v month '%(%m)T' "$now"
printf -v day '%(%d)T' "$now"
</pre>
If your system's <code>strftime()</code> doesn't support <code>%s</code>, you can get the epoch time with:

<pre>
now=$(awk 'BEGIN{srand(); print srand()}')
</pre>

<span id="pf59"></span>
== i=$(( 10#$i )) ==
Forced base 10 interpretation only works with signless numbers.  As long as <code>$i</code> contains a string of digits with no leading <code>-</code> or <code>+</code>, everything is fine.  But if <code>$i</code> might be negative, this conversion could fail, either noisily (with an error message), or even worse, silently (simply yielding the wrong result).

If there's any chance <code>$i</code> could be negative, use this instead:

<pre>
i=$(( ${i%%[!+-]*}10#${i#[-+]} ))
</pre>
For explanations, please see [[ArithmeticExpression]].

<span id="pf60"></span>
== set -euo pipefail ==
There are many pitfalls to enabling these options at the start of a script.

=== errexit ===

errexit (set -e) tries to abort the script when an error occurs, which sounds
like a good idea at first, but it has very intricate rules regarding when to
abort on error or not. Some of the main problems with errexit are

<ul><li> It's not actually possible for the shell to detect errors. All it has to go on is a command's exit status. When commands fail, they normally return a non-zero exit status, but many commands also use the exit status to convey a true/false value. Examples of such commands are <code>test</code>, <code>[</code>, <code><nowiki>[[ … ]]</nowiki></code>, <code>((…))</code>, and <code>grep</code>.
<li> When a command you test with <code>if</code> or <code>&&</code> or <code>||</code> is a function, set -e ignores non-zero exit statuses of commands in that function. Consider a function like
 <pre>
# WRONG
cleanup() {
  cd "$1"
  rm -f ./*
}
</pre>
: If that <code>cd</code> command fails, you definitely don't want that <code>rm</code> command to run, and with a simple use of the function when errexit is enabled, that happens to be the case:
 <pre>
set -e
cleanup() {
  cd "$1"
  printf 'Oops!\n'
}
cleanup /no/longer/there
# scriptname: cd: /no/longer/there: No such file or directory
</pre>
: But then later you decide to add a custom error message
 <pre>
cleanup /no/longer/there || {
  printf >&2 'Cleanup failed\n'
  exit 1
}
# scriptname: cd: /no/longer/there: No such file or directory
# Oops!
</pre>
: <code>cd</code> is being run in a context where it's tested, even though it's not at all apparent inside the function definition where the line is located. The correct way, with or without errexit, is to explicitly check if <code>cd</code> failed or not
 <pre>
# Right
cleanup() {
  cd -- "$1" || return
  rm -f ./*
}
</pre>
<li> Command substitution disables errexit. Consider the following example function
 that mimics a realpath command:
 <pre>
set -e
realdir() {
  cd "$1"
  pwd -P
}
realdir /no/such/dir
# scriptname: cd: /no/such/dir
</pre>
: It aborted on the failing <code>cd</code> command, but if you try to capture its output, then <code>cd</code>'s failure is ignored
 <pre>
dir=$(realdir /no/such/dir)
# scriptname: cd: /no/such/dir
printf 'dir is <%s>\n' "$dir"
# dir is </home/user>
</pre>
: The correct way is again to explicitly check if <code>cd</code> failed or not, regardless of whether you use errexit
 <pre>
# Right
realdir() {
  cd -- "$1" || return
  pwd -P
}
</pre>
</ul>

See
* [[BashFAQ/105|Why doesn't set -e (or set -o errexit, or trap ERR) do what I expected?]].
* [[wikipedia:Semipredicate problem|Semipredicate problem]]

=== pipefail ===

Normally, the exit status of a pipeline is the exit status of the last
command of that pipeline. With pipefail, if any part of the pipeline returns
non-zero, the whole pipeline returns non-zero. This may sound like a good idea,
but it's actually normal for commands earlier in a pipeline to exit non-zero
without it being an error. Consider the following example

<pre>
if some_command | grep -q foo; then
   printf 'foo found\n'
else
   printf 'foo not found\n'
fi
</pre>

If pipefail is enabled, the above will sometimes claim "foo not found" even when
foo was found.

<code>grep -q foo</code> returns 0 to indicate that at least one line matches the pattern,
else it returns 1 to indicate that no lines matched the pattern. Since <code>-q</code>
(quiet) causes grep to not output the matching lines, it doesn't actually need
to read the whole stream; it's enough to find at least one line that matches the
pattern. A typical grep implementation will thus exit with status 0 as soon as
it found the first matching line.

The <code>some_command</code> on the other end of the pipeline will not know that. It only
sees its end of the pipe, it does not see what is on the other end. When it
tries to write the next chunk of data to the pipe, and the pipe is closed in the
other end, the system will send <code>some_command</code> a SIGPIPE signal to tell it that
it can no longer write to the pipe. The default action to take when SIGPIPE is
received is to exit with a non-zero status. This means that the whole pipeline
returns non-zero, and the <code>else</code> branch is executed, even though it successfully
found a matching line.

If you know that each part of a pipeline beyond the first will consume all their
input, pipefail is safe and often a good choice, but it should not be enabled
globally, only enabled for pipelines where it makes sense, and disabled
afterwards.

=== nounset ===

nounset (set -u) is the least bad of the three options, but has its fair share
of gotchas too. If the goal is to catch typoed variable names,
[https://shellcheck.net shellcheck] does a better job at detecting those.

See
[[BashFAQ/112|What are the advantages and disadvantages of using set -u (or set -o nounset)?]]

<span id="pf61"></span>
== [[ -v hash[$key] ]] ==
Here, <code>hash</code> is an [[BashFAQ/006|associative array]].  This construct works correctly in bash 5.2, but fails in other versions of bash because <code>$key</code> is expanded before the array subscript evaluation, and then the whole array plus expanded index is evaluated in a second pass.  It will appear to work for simple keys, but it will fail for keys containing quotes, closing square brackets, etc.  Even worse, it introduces a [[CodeInjection]] if the <code>$key</code> contains [[CommandSubstitution]] syntax.

The same problem applies to the <code>test</code> and <code>[</code> commands, as well as any use of an associative array element in an arithmetic context.  (Arithmetic contexts are complicated enough they have their [[#pf62|own separate pitfall]].)

The feature being used (<code>-v hash[$key]</code>) only exists in 4.2 and later, but there is '''no''' known workaround that will make it give correct results with arbitrary keys in version 4.2.  In bash versions 4.3 and higher, you can single-quote the entire argument:

<pre>
[[ -v 'hash[$key]' ]]
</pre>

This has been tested successfully in versions 4.3 through 5.2.  As a special note, if the <code>assoc_expand_once</code> option is enabled, this causes the workaround to fail in bash 5.1.

If you want to use this feature and you're looking to write code that works in as many versions of bash as possible, the single-quoting workaround is the best known option.

If you need a Hash Set analogue (an associative array that simply tells you whether an element is in the array or not) in bash 4.0 through 4.2, you'll have to abandon the <code>-v</code> feature, and use more basic constructs.  The simplest choice would be to use a non-empty string as the ''value'' when adding an element to the array, and then simply test for a non-empty string to determine membership:

<pre>
if [[ ${hash[$key]} ]]; then
    : key is in the array
else
    : key is not in the array
fi
</pre>

This works in all bash versions that have associative arrays (4.0 and higher).

<span id="pf62"></span>
== (( hash[$key]++ )) ==
Surprise!  [[BashFAQ/006|Associative arrays]] are even ''more'' broken in math contexts.  The single-quoting trick from the previous pitfall isn't enough to fix this, either -- it only works in versions 5.0 and ''lower''.

[https://lists.gnu.org/archive/html/bug-bash/2021-02/msg00189.html According to Chet Ramey], the single quotes don't work in newer versions because the contents of a math context are treated as though they are double-quoted, and therefore the single quotes have no special meaning.  Prior to the release of bash 5.2, backslash still retained its special meaning here, and could be used to quote the index:

<pre>
(( hash[\$key]++ ))    # Safe before bash 5.2. No longer recommended.
</pre>

With the release of bash 5.2, your options are even more limited.  There are four known bash-version-portable ways to safely modify an element of an associative array in a calculation.  The first is to store a temporary copy of the value in a regular (string) variable:

<pre>
tmp=${hash[$key]}      # Safe.
((tmp++))
hash[$key]=$tmp

# Or:
tmp=${hash[$key]}      # Safe.
hash[$key]=$((tmp+1))
</pre>

The second way is similar to the second example above, except you reference the associative array element within the arithmetic context as a parameter expansion. You can't assign a value to it within the arithmetic context that way, but that's easy enough to deal with.

<pre>
hash[${key}]=$(( ${hash[${key}]} + 1 ))
</pre>

The third way is to use the <code>let</code> command, with the whole arithmetic command single-quoted:

<pre>
let 'hash[$key]++'     # Safe.
</pre>

The fourth way is to fool the parser in such a way that the bash 5.2 changes don't get triggered.  This is questionable, but is included for completeness.

<pre>
(( hash${#+[\$}key]++ ))     # Possibly safe, but nearly incomprehensible.
</pre>

As a special note, enabling the <code>assoc_expand_once</code> shell option ''breaks'' the backslash workaround and the <code>let</code> workaround.

----

I don't know what the deal is with 5.2. If that's broken then pf45's workaround is also broken until bash gets this sorted. It appears bash has made the parser more complex by selectively removing the pre-expansion step for certain parts of expressions. That's bad because the rules for when that happens are undocumented, and you would need to know how bash decides that in order to know where to escape things. <code>let</code> looks unaffected, as expected, because its arguments are passed directly to <code>arith.c</code> without the parser mangling the expression unpredictably.

<pre>
(ins)gentoo@ormaaj-laptop (27228) ~ $ ( shopt -u assoc_expand_once; key=\'\]; typeset -A arr; arr[$key]=0; let 'arr[$key]++'; typeset -p arr BASH_VERSINFO )
declare -A arr=(["']"]="1" )
declare -ar BASH_VERSINFO=([0]="5" [1]="2" [2]="0" [3]="1" [4]="release" [5]="x86_64-pc-linux-gnu")
</pre>

Same with or without <code>assoc_expand_once</code>. But looks like <code>(())</code> isn't safe for now until we have more information. Hopefully that gets fixed or reverted.

<span id="pf63"></span>
== while … done <<< "$(foo)" ==

Let's start with the correct answer first, and then explain why the wrong answer is wrong.  Here's what you should be doing instead:

<pre>
while … done < <(foo)
</pre>

Or, if you don't actually need the <code>while</code> loop to run in the current shell process, you can use an ordinary pipeline:

<pre>
foo | while … done
</pre>

When using the <code>< <(foo)</code> ([[ProcessSubstitution]]) version, what happens is pretty simple.  Depending on your operating system, either a named pipe is created, or a <code>/dev/fd/*</code> entry is used to similar effect.  The <code>while</code> loop's standard input is redirected from that source.  Then, a background subshell is launched, in which the writer command <code>foo</code> is executed.  The output of <code>foo</code> goes into the pipe (or pipe-analogue), and the <code>while</code> loop reads from it.  It's all very simple.  There's nothing to worry about.

With the <code><<< "$(foo)"</code> variant, there are a few additional steps involved, and some of them are undesirable.  For starters, the entire output of <code>foo</code> has to be collected first.  There is no simultaneous execution, as there is with the pipeline or the process substitution.  Second, due to the way <code>$(…)</code> works, there are ''three'' modifications to the input stream.  All NUL bytes are discarded, either silently, or with a warning, depending on the version of bash.  All trailing newlines are removed.  Finally, a newline character is added to the end of the input.  All of the modified input is written into a temporary file, and then the temporary file is opened for reading by the <code>while</code> loop.

(Some versions of bash may use a pipe instead of a temporary file, depending on the size of the here string.  Do not write code that assumes your here string uses a temporary file.  If you require a temporary file, create one explicitly.)

<span id="pf64"></span>
== cmd > "file$((i++))" ==

Redirections for simple commands may be run in a [[SubShell]], so the value of $i in the following example may not change in the main shell (it will not in bash and ksh, but it will in dash):

<syntaxhighlight lang="bash">
#!/bin/bash --
i=0

declare -p files=( * ) i
# declare -a files=()
# declare -- i="0"

cmd arg > "file$(( i++ ))"

declare -p files=( * ) i
# declare -a files=([0]="file0")
# declare -- i="0"
</syntaxhighlight>

Running the redirections in a subshell (i.e. after the fork) is done as an optimisation; it saves the shell the need to restore the redirected file descriptor after the command has terminated.

You can use the following alternatives to prevent this optimisation:

<syntaxhighlight lang="bash">
#!/bin/bash --
shopt -s nullglob

i=0
declare -p files=( * ) i
# declare -a files=()
# declare -- i="0"

# Use a temporary variable to ensure that file$(( i++ )) is expanded in
#  the correct shell.
file=file$(( i++ ))
cmd arg > "$file"
declare -p files=( * ) i
# declare -a files=([0]="file0")
# declare -- i="1"

# Or apply the redirections to a group compound command that only
#  contains the simple command.
{ cmd arg ;} > "file$(( i++ ))"
declare -p i files=( * )
# declare -a files=([0]="file0" [1]="file1")
# declare -- i="2"
</syntaxhighlight>

Bash also applies this optimisation to subshell compound commands:

<syntaxhighlight lang="bash">
#!/bin/bash --
shopt -s nullglob

i=0
declare -p files=( * ) i
# declare -a files=()
# declare -- i="0"

(cmd1 arg1; cmd2 arg2) > "file$(( i++ ))"
declare -p files=( * ) i
# declare -a files=([0]="file0")
# declare -- i="0"

# Again, you can apply the redirection to a group compound command that
#  contains the subshell compound command to prevent the optimisation.
{ (cmd1 arg1; cmd2 arg2) } > "xfile$(( i++ ))"
declare -p files=( * ) i
# declare -a files=([0]="file0" [1]="xfile0")
# declare -- i="1"
</syntaxhighlight>

Similar problems can be encountered when using redirections like <code>{foo}> file</code>, <code>> "$BASHPID"</code>, <code>< "${foo=bar}"</code>, or <code>(cmd1 & cmd2 & wait) > >(...)</code>.

Also see https://www.vidarholen.net/contents/blog/?p=865

<span id="pf65"></span>
== IFS= read -r -d <nowiki>''</nowiki> filename ==
Setting IFS to the empty string (to avoid trimming leading and trailing whitespace characters) is important, even necessary, but it turns out that with some versions of bash, it isn't enough to read arbitrary strings.

On Unix, command line arguments, pathnames, environment variables and bash shell variables for instance are arbitrary sequences of non-NUL bytes (C strings); and applications may or may not choose to interpret them as characters (based on the character set/map specified by the locale or not). Bash itself does it sometimes and sometimes not though it internally stores its variable contents as arrays of bytes. A text file may also be encoded in a wide variety of character encodings.

Versions of bash between 5.0 and 5.3-rc1 (the first release candidate, ''not'' the final release) have a bug whereby their <code>read</code> builtin utility can read past the record delimiter (as specified with <code>-d</code>, newline being the default) when invoked in locales that use a multibyte character encoding such as UTF-8 or GB18030 and the record ends in what would be a truncated character in that encoding, even when the delimiter is NUL (making it also a POSIX conformance bug in that case as [https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/utilities/read.html#tag_20_100_06 POSIX requires <code><nowiki>read -d ''</nowiki></code> to be able to cope with non-text data]), and even though <code>-d</code> takes a byte and not character, that bash contrary to yash stores variables in their raw not decode form and we're not using the <code>-n</code> option and splitting is disabled so there's no need to decode the input.

So you need to change the locale to one with a single byte per character character encoding to avoid those decoding errors. The <code>C</code> aka <code>POSIX</code> one is an obvious one as it's guaranteed to be present on all systems:

<pre>
IFS= LC_ALL=C read -r -d '' filename
</pre>

Normally, setting <code>LC_CTYPE=C</code> (the character type category of the locale) should be enough, but that won't work if <code>LC_ALL</code> is also already set in the environment as <code>LC_ALL</code> takes precendence over all other <code>LC_*</code> variables and <code>LANG</code>. It's also possible to do <code>LC_ALL= LC_CTYPE=C</code> so as not to affect the other locale categories (unless <code>LC_ALL</code> was set beforehand) such as the language of the error messages that <code>read</code> may output but in any case the charmap of the <code>C</code> locale which on most systems is ASCII cannot express most languages, so setting <code>LC_ALL=C</code> (where messages will be in English) is probably for the best anyway.

If you don't do this, what happens is specific to your character encoding and your bash version. On a UTF-8 system, given a NUL-delimited stream containing three filenames, the following results can be observed.

<pre>
names() { printf 'FOO\0\315\0\226\0'; }
export -f names

bash-4.4$ while IFS= read -rd '' f; do printf '<%q> ' "$f"; done < <(names); echo
<FOO> <$'\315'> <$'\226'> 

bash-5.0$ while IFS= read -rd '' f; do printf '<%q> ' "$f"; done < <(names); echo
<FOO> <$'\315'>

bash-5.2$ while IFS= read -rd '' f; do printf '<%q> ' "$f"; done < <(names); echo
<FOO> <$'\315'>

bash-5.3$ while IFS= read -rd '' f; do printf '<%q> ' "$f"; done < <(names); echo
<FOO> <$'\315'> <$'\226'>
</pre>

The results for 4.4 and 5.3 are correct, but not those for 5.0 and 5.2. Adding LC_CTYPE=C fixes them. Evidently, it is a regression introduced by 5.0 that was only addressed during the 5.3 development cycle. Specifically, the following four git commits are known to have collectively addressed the issue:

[https://cgit.git.savannah.gnu.org/cgit/bash.git/commit/?h=devel&id=772e7e760e8a098e4d8dee21cf11090be4757918|772e7e760e8a098e4d8dee21cf11090be4757918 One]<BR>
[https://cgit.git.savannah.gnu.org/cgit/bash.git/commit/?h=devel&id=e327891b52513bef0b34aac625c44f8fa6811f53|e327891b52513bef0b34aac625c44f8fa6811f53 Two]<BR>
[https://cgit.git.savannah.gnu.org/cgit/bash.git/commit/?h=devel&id=7731dc5c4d405ab147fc562e3af2a375ca593554|7731dc5c4d405ab147fc562e3af2a375ca593554 Three]<BR>
[https://cgit.git.savannah.gnu.org/cgit/bash.git/commit/?h=devel&id=535a8150b65ee6888f54f602274dbbdcd77c788e|535a8150b65ee6888f54f602274dbbdcd77c788e Four]

As of July 2025, Gentoo and Arch are the only OS vendors confirmed to have [https://gitweb.gentoo.org/repo/gentoo.git/tree/app-shells/bash/files?id=ab0259bdf5fd1c77ca72f7723e73d43d6820aa0f backported some of these patches] (to their 5.2 releases). There are no official patchlevels for releases prior to 5.3 that incorporate these changes.

This pitfall also applies to any binary data (or text encoded in a charmap other than that of the locale) that you try to read with the <code>read</code> command, though of course you must also be aware that NUL bytes can't be stored in bash variables. It's not uncommon for file names or text files to be encoded in a charmap other than UTF-8 especially when they come from other systems or were created at a time when UTF-8 wasn't the norm yet in which case you can easily run into this pitfall.

[[Category:Shell]]