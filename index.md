---
layout: layouts/base.liquid
title: Home
---

Hi, I'm Celi. 

This is my personal site (Currently Under Construction)

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
