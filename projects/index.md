---
layout: layouts/base.liquid
title: Projects
eleventyExcludeFromCollections: true
---

## Current

<ul class="project-list">
{% for project in collections.currentProjects %}
  <li>
    <a class="project-card" href="{{ project.url }}">
      {%- if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif -%}
      <div class="project-card-text">
        <h3>{{ project.data.title }}</h3>
        {%- if project.data.subtitle %}<p class="subtitle">{{ project.data.subtitle }}</p>{% endif -%}
      </div>
    </a>
  </li>
{% endfor %}
</ul>

## Archived

<ul class="project-list">
{% for project in collections.archivedProjects %}
  <li>
    <a class="project-card" href="{{ project.url }}">
      {%- if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif -%}
      <div class="project-card-text">
        <h3>{{ project.data.title }}</h3>
        {%- if project.data.subtitle %}<p class="subtitle">{{ project.data.subtitle }}</p>{% endif -%}
      </div>
    </a>
  </li>
{% endfor %}
</ul>
