---
layout: layouts/base.liquid
title: Projects
eleventyExcludeFromCollections: true
---

## Current

<ul class="project-list">
{% for project in collections.currentProjects %}
  <li class="project-card">
    {% if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif %}
    <h3><a href="{{ project.url }}">{{ project.data.title }}</a></h3>
    {% if project.data.subtitle %}<p class="subtitle">{{ project.data.subtitle }}</p>{% endif %}
  </li>
{% endfor %}
</ul>

## Archived

<ul class="project-list">
{% for project in collections.archivedProjects %}
  <li class="project-card">
    {% if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif %}
    <h3><a href="{{ project.url }}">{{ project.data.title }}</a></h3>
    {% if project.data.subtitle %}<p class="subtitle">{{ project.data.subtitle }}</p>{% endif %}
  </li>
{% endfor %}
</ul>
