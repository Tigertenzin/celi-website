---
layout: layouts/changelog.liquid
title: "Changelog — KaoBloom"
description: "What's new in each version of KaoBloom."
---

[← Back to KaoBloom](/projects/kaomoji-keyboard/)

{% for version in collections.changelogVersions %}{% if version.url contains "/projects/kaomoji-keyboard/" %}
<section class="changelog-version">
<h2><a href="{{ version.url }}">{{ version.data.title }}</a></h2>
{{ version.content | changelogSummary: version.url }}
</section>
{% endif %}{% endfor %}
