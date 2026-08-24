---
layout: layouts/base.liquid
title: Blog
---

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    — {{ post.data.date | date: "%d %b %Y" }}
  </li>
{% endfor %}
</ul>
