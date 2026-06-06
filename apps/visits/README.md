# Simple visit counter for your Markdown file

For storing the data I use [GoatCounter](https://www.goatcounter.com/). No cookies
required and DSGVO ready, so this can be implemented savely without any harm.

## Environment

Set the following variables in the Vercel project (Production + Preview):

- `GOATCOUNTER_TOKEN` — API token from your GoatCounter site settings
- `GOATCOUNTER_SITE_URL` _(optional)_ — Site URL, defaults to `https://muuvmuuv.goatcounter.com`

> Figma SVG file can be found here:
> https://www.figma.com/file/h8US2k7HOOBNmIAxxXA54T/SVG-Visits?node-id=6%3A3

## Themes

Choose a theme with `?theme=<name>`

SVGs have no intrinsic dimensions — set `height` (or `width`) on the `<img>`
tag to control the displayed size. Browsers preserve the aspect ratio from
the SVG's `viewBox`.

| Name    | Preview                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------- |
| tiles   | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=tiles" height="60" alt="">   |
| mosaic  | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=mosaic" height="60" alt=""> |
| flip    | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=flip" height="60" alt="">    |
| board   | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=board" height="60" alt="">   |
| lcd     | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=lcd" height="60" alt="">     |

### Theme options

Themes can take extra URL params as options. Escape `#` in hex colors as
`%23` (a raw `#` starts the URL fragment and cuts the param off) — or just
leave it out, both work.

| Theme  | Option  | Description                                                      |
| ------ | ------- | ---------------------------------------------------------------- |
| mosaic | `color` | Hex color of the lit cells, e.g. `?theme=mosaic&color=%2338c172` |

## Debug

Debug the SVG with `?debug=true` to not send anything to GoatCounter and show a test number.

## Thanks to...

- [Webshocker](https://dribbble.com/shots/3505409-Counter) and his amazing work on
  Dribbble with the `cyber` theme.
- natemoo and his
  [now-playing](https://github.com/natemoo-re/natemoo-re/blob/master/api/now-playing.ts)
  SVG where I got the logic for Vercel serverless functions with react
- leereilly for his
  [dev.to post](https://dev.to/github/10-standout-github-profile-readmes-h2o) inspiring me
  to do this stuff
- [sagar-viradiya](https://github.com/sagar-viradiya/sagar-viradiya) with the counter idea
