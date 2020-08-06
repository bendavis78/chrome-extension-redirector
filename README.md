Redirector for Chrome
=====================

This simple extension allows you to redirect urls using the power of regular
expressions. To add a redirect, go to chrome://extensions, and click on
"Options" next to the Redirector extension. From the options page you can
add new redirects, and view/delete existing ones.

For example, you can have all mobile Wikipedia urls to open in desktop mode
(this is convered in the tutorial below).

You could also redirect to non-browser schemes to launch external apps. For
example,If you want youtube links to open in a desktop video app (such as
minitube), you can redirect all youtube urls with a "youtube:" prefix, and then
set up a scheme handler on your OS to pass youtube: urls to your player.

---

### Tutorial ###

Sometimes people send you links to the mobile version of a website.
You're on your desktop, and you'd rather see the desktop version.
For example, a mobile Wikipedia url looks like this:

    http://en.m.wikipedia.org/wiki/Regular_expression

To set up a redirect for mobile Wikipedia urls, enter the following:

    From: ^http://(.*?)\.m\.wikipedia\.org/(.*)
    To: http://$1.wikipedia.org/$2

Here's a breakdown of the FROM pattern if you're not familiar with regular
expressions. When we say "matches", that means the redirect will only trigger if
a match occurs.

| Regex              | Effect                                       
| -----------------  | ------------------------------------------------------- |
| ^                  | starts matching at the beginning of the url             |
| http://            | matches "http://"                                       |
| (.*)\.             | matches zero or more characters until the next dot and captures it as group $1 |
| m\.wikipedia\.org/ | matches "m.wikipedia.org/"                              |
| (.*)               | matches the rest of the url and captures it in group 2 |

If the URL matches, group $1 will contain the "en" part of the domain, and group
$2 will contain everything after the domain name. So the resulting redirect url
in our example will become:

    http://en.wikipedia.org/wiki/Regular_expression

To learn more about regular expressions, try the interactive tutorial at
[RegexOne.com][1]. 

[1]: http://regexone.com/ "RegexOne"
