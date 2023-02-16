# Web Caption Maker

Chances are if you're reading this, you got lost. just go to [647131.github.io](https://6474131.github.io/) and you'll
be fine.

On the off chance that you're here on purpose and want to look at the code or to listen to me ramble, feel free to read
on.

## Code

This is a small Vue3 web app, and given that it's my first one I'm not sure its structured particularly well. The
stores (under the `stores/`) could be a little better, especially with the duplicity between the body style store and
character tag store.

Some of the components are also larger than I like- mostly because I was having difficulties understanding how to pass
data both from parent to child and child to parent interchangeably (I found $emit cumbersome and annoying). I ended up
removing a lot of smaller components in lieu of just larger ones that were more encompassing and could better handle
filling in information from cache. Props in general were a little strange when working with constantly updating
information, though I would like to refactor the code in respect to using smaller components again at some point.
The code itself is not at all optimized- it runs dozens of regexes with every keypress and I'm fairly sure that it could
be far more performant. However, on my own laptop, I haven't noticed any issues with performance in any manner, so
there's been no need to optimize, at least yet.

If people wish to do pull requests, you're more than welcome. Just make sure all basic functionality works before doing
so. UI suggestions would also be appreciated, but I tried my hardest to make it intuitive for most end users. My only
real complaint on this end is that users still have to manually insert image tags `{img}` and I would like to come up
with a way so they don't have to (maybe something under the caption wizard...?).

## History

This project originally started several years ago- when I recognized that it was difficult for end users to make even
simple captions in GIMP due to a plethora of bugs and annoyances (some of which may be due to me using it on Windows).
So I strove to make a tool for making my own caps. Originally it was a simple Python script that would take in a Google
docs link, do some wizardry with the HTML that involved Regex (bad idea), and spit out a fairly decent looking picture
using wkhtmltopng (a library that I *truly* do not recommend given its old architecture and myriad of bugs and
limitations. I eventually had the idea to make a Discord bot for making caps, which was a fairly good idea at the time,
though scaled terribly.

Pros of the Discord bot:

- No need to buy a domain or host a server
- Automatic spam filtering
- Easy caching of previous captions to continue work or look at old works
- Incredibly easy for me to both see what users were doing and help them or understand where they struggled

Cons of the Discord bot:

- The UI was a headache in and of itself, requiring me to come up with stateless information across Bot reloads so I
  didn't have to use an external server
- There was no way to 'preview' what the caption was going to look like, although I did have ideas for how to do that
  later into the bots life cycle
- Incredibly hard to extend, effectively had to write my own UI library even while using Pycord

I eventually made great improvements to the Discord bot, but it was DoA given how difficult it was to use. I don't
regret making it though, and until I recently started working in Web Development full time I never would have had the
knowhow to not only write this entire thing in client side Javascript/NodeJS, but to make a comprehensible UI.

## Planned Features

Most of the features still to be implemented will likely take time.

- [ ] Multiple templates (multiple column/winged caps)
- [ ] Draggable text boxes
- [ ] Image insertion wizard
- [ ] Minor text options like making individual words bigger or smaller, shadows/outlines, etc...