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

{%- assign doodlebloom = collections.currentApps | where: "url", "/projects/doodlebloom/" | first %}
{% if doodlebloom %}
<ul class="post-list post-list--bare">
  <li>
    <a class="post-item" href="{{ doodlebloom.url }}">
      <div class="post-text">
        <div class="post-meta">
          <h3>{{ doodlebloom.data.title }}</h3>
          <span class="date">In beta</span>
        </div>
        <p class="post-excerpt">{{ doodlebloom.data.subtitle }}</p>
      </div>
      <img class="post-thumb post-thumb--icon" src="{{ doodlebloom.data.icon }}" alt="" loading="lazy">
    </a>
  </li>
</ul>

<p class="see-more"><a href="{{ doodlebloom.url }}">Read more here →</a></p>
{% endif %}
