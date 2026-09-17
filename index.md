---
layout: layouts/base.liquid
title: Home
description: "Celi's personal site — blog posts, iOS app projects, and whatever else feels worth writing about."
hideTitle: true
---

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

<p class="see-more"><a href="/posts/">See all posts →</a></p>

## Recently Released

_Coming soon._
