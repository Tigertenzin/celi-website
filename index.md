---
layout: layouts/base.liquid
title: Home
description: "Celi's personal site — blog posts, iOS app projects, and whatever else feels worth writing about."
---

Hi, I'm Celi. 

i've decided to start a little blog/personal website. i've also started up iOS development again, after [my first project](/projects/oaks-parcel/) 5 years ago that has gone abandoned. i have some random small projects in the works, nothing worth showing yet. as they get closer to a finished state, i'll probably start showing stuff off here and on [Mastodon](https://mastodon.world/@Celeryboi)/[Bluesky](https://bsky.app/profile/celeryboi.bsky.social)!

but for now, i made my first blog post, just a little intro to myself. hopefully you'll stick around as i continue development!

- [Read the blog](/posts/)
- [See my projects](/projects/)
- [Find me elsewhere](/links/)

## Lately

{% if collections.posts.size > 0 %}
{%- assign latest = collections.posts.first -%}
{%- assign thumb = latest | thumbnail -%}
<ul class="post-list post-list--bare">
  <li>
    <a class="post-item" href="{{ latest.url }}">
      <div class="post-text">
        <div class="post-meta">
          <h3>{{ latest.data.title }}</h3>
          <span class="date">{{ latest.data.date | readableDate }}</span>
        </div>
        <p class="post-excerpt">{{ latest.templateContent | excerpt }}</p>
      </div>
      {%- if thumb %}<img class="post-thumb" src="{{ thumb }}" alt="" loading="lazy">{% endif -%}
    </a>
  </li>
</ul>
{% endif %}
