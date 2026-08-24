---
layout: layouts/base.liquid
title: Projects
---

<ul>
{% for project in collections.projects %}
  <li>
    <a href="{{ project.url }}">{{ project.data.title }}</a>
  </li>
{% endfor %}
</ul>
