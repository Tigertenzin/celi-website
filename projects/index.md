---
layout: layouts/base.liquid
title: Projects
description: "iOS apps and other projects built by Celi."
eleventyExcludeFromCollections: true
---

## Current

{% if collections.currentApps.size > 0 %}<h3 class="project-group">Apps</h3>
<ul class="app-grid">
{% for project in collections.currentApps %}
  <li>
    <a class="app-tile" href="{{ project.url }}">
      {%- if project.data.icon %}<img class="app-icon" src="{{ project.data.icon }}" alt="">{% endif -%}
      <h3>{{ project.data.title }}</h3>
      {%- if project.data.subtitle %}<p class="subtitle">{{ project.data.subtitle }}</p>{% endif -%}
    </a>
  </li>
{% endfor %}
</ul>{% endif %}

{% if collections.currentOtherProjects.size > 0 %}<h3 class="project-group">Plugins</h3>
<ul class="project-list">
{% for project in collections.currentOtherProjects %}
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
</ul>{% endif %}

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
