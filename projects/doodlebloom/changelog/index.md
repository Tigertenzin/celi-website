---
layout: layouts/changelog.liquid
title: "Changelog — DoodleBloom"
description: "What's new in each version of DoodleBloom."
---

[← Back to DoodleBloom](/projects/doodlebloom/)

{% for version in collections.changelogVersions %}{% if version.url contains "/projects/doodlebloom/" %}
<section class="changelog-version">
<h2><a href="{{ version.url }}">{{ version.data.title }}</a></h2>
{{ version.content | changelogSummary: version.url }}
</section>
{% endif %}{% endfor %}
