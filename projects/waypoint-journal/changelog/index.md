---
layout: layouts/changelog.liquid
title: "Changelog — Waypoint Journal"
description: "What's new in each version of Waypoint Journal."
---

[← Back to Waypoint Journal](/projects/waypoint-journal/)

{% for version in collections.changelogVersions %}{% if version.url contains "/projects/waypoint-journal/" %}
<section class="changelog-version">
<h2><a href="{{ version.url }}">{{ version.data.title }}</a></h2>
{{ version.content | changelogSummary: version.url }}
</section>
{% endif %}{% endfor %}
