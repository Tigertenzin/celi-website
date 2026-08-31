---
layout: layouts/base.liquid
title: Projects
eleventyExcludeFromCollections: true
---

## Current

<ul class="project-list">
{% for project in collections.currentProjects %}
  <li>
    {% if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif %}
    <a href="{{ project.url }}">{{ project.data.title }}</a>
  </li>
{% endfor %}
</ul>

## Archived

<ul class="project-list">
{% for project in collections.archivedProjects %}
  <li>
    {% if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif %}
    <a href="{{ project.url }}">{{ project.data.title }}</a>
  </li>
{% endfor %}
</ul>
