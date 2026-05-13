# Simple visit counter for your Markdown file

For storing the data I use [Umami](https://umami.is/). No cookies required and DSGVO
ready, so this can be implemented savely without any harm.

## Environment

Set the following variables in the Vercel project (Production + Preview):

- `UMAMI_WEBSITE_ID` — Website ID from the Umami Cloud dashboard
- `UMAMI_API_KEY` — Umami Cloud API key, used to read the page view total
- `UMAMI_HOST_URL` _(optional)_ — Tracking host, defaults to `https://cloud.umami.is`
- `UMAMI_API_CLIENT_ENDPOINT` _(optional)_ — Stats API endpoint, defaults to `https://api.umami.is/v1`

> Figma SVG file can be found here:
> https://www.figma.com/file/h8US2k7HOOBNmIAxxXA54T/SVG-Visits?node-id=6%3A3

## Themes

Choose a theme with `?theme=<name>`

SVGs have no intrinsic dimensions — set `height` (or `width`) on the `<img>`
tag to control the displayed size. Browsers preserve the aspect ratio from
the SVG's `viewBox`.

| Name    | Preview                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------- |
| classic | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=classic" height="60" alt=""> |
| cyber   | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=cyber" height="60" alt="">   |
| flip    | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=flip" height="60" alt="">    |
| board   | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=board" height="60" alt="">   |
| lcd     | <img src="https://visits.muuvmuuv.vercel.app/image.svg?debug=true&theme=lcd" height="60" alt="">     |

## Debug

Debug the SVG with `?debug=true` to not send anything to Umami and show a test number.

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
