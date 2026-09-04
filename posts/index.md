---
layout: layouts/base.liquid
title: Blog
eleventyExcludeFromCollections: true
---

<ul class="post-list">
{% for post in collections.posts %}
  <li>
    <a class="post-item" href="{{ post.url }}">
      <div class="post-meta">
        <h3>{{ post.data.title }}</h3>
        <span class="date">{{ post.data.date | readableDate }}</span>
      </div>
      <p class="post-excerpt">{{ post.templateContent | excerpt }}</p>
    </a>
  </li>
{% endfor %}
</ul>

<p class="end-of-posts">🌸 you've reached the bottom 🌸</p>
