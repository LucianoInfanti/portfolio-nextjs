# Why this website exists

This is not your usual designer portfolio. I'm not interested in showingcase work — at least not for now. I guess only time will tell. I've always wanted a place to write small thoughts and ideas. Maybe tutorials and guides on subjects that are (most likely) unpopular. Above everything else, this is my personal playground. A place where I can try coding-related stuff, where I can try new text formats and just have some fun.

A lot of details are still being ironed out. Keep in mind I'm coding everything myself as learn so progress is sometimes slow — and almost always, painful.

## Kown bugs

There are definitely bugs and undesired behaviors. This is a non exaustive list of things that require attention and fix. If you find something else that is not listed below, please do let me know.

- On a certain scroll depth, Writing link within Article pages will not work
- In production: fonts reloading (flashing) -> this might have been fixed
- Review the fading animation for `Published — DD/MM/YYYY` as its kinda buggy
- In production: some text is jumping around -> this might have been fixed

## Solved bugs

- Articles with small first paragraphs will cause a bug if the title is 2 lines long

## To do

Incremental progress is how I'm tackling this challenge. So there will always be something to do. An animation to polish, a better code to write, a new technology to try. So far, this is what I'm planning to do next, in no particular order.

- Make `<Header>` dissapear when the list is too big and the user scrolls down the page
- Make sure the article list will behave fine when there are multiplie blog entries
- Mobile & responsiviness with `clamp()` and similar functions
- Take a pass at all animations and standardize motion tokens
- Figure it out how to render `.mp4` files on web
- Light/Mode Mode

## (Possible) Future Updates

- Cooler hover for images inside the article
- Like counter for posts, if possible (most likely not without Next.js)
- Share buttons
- Add About page
- Add Work page
- Use `{children}` to make sure I can use the `<AnimatedText/>` component
