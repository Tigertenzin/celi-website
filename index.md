---
layout: layouts/base.liquid
title: Home
---

Hi, I'm Celi. 

i've decided to start a little blog/personal website. i've also started up iOS development again, after [my first project](/projects/oaks-parcel/) 5 years ago that has gone abandoned. i have some random small projects in the works, nothing worth showing yet. as they get closer to a finished state, i'll probably start showing stuff off here and on [Mastodon](https://mastodon.world/@Celeryboi)/[Bluesky](https://bsky.app/profile/celeryboi.bsky.social)!

but for now, i made my first blog post, just a little intro to myself. hopefully you'll stick around as i continue development!

- [Read the blog](/posts/)
- [See my projects](/projects/)
- [Find me elsewhere](/links/)

## Lately

{% if collections.posts.size > 0 %}
<ul class="post-list post-list--bare">
  <li>
    <a class="post-item" href="{{ collections.posts.first.url }}">
      <div class="post-meta">
        <h3>{{ collections.posts.first.data.title }}</h3>
        <span class="date">{{ collections.posts.first.data.date | readableDate }}</span>
      </div>
      <p class="post-excerpt">{{ collections.posts.first.templateContent | excerpt }}</p>
    </a>
  </li>
</ul>
{% endif %}
