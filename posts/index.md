---
layout: layouts/base.liquid
title: Blog
eleventyExcludeFromCollections: true
---

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    — {{ post.data.date | readableDate }}
  </li>
{% endfor %}
</ul>
