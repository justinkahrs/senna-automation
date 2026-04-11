<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          <xsl:choose>
            <xsl:when test="/rss/channel/title"><xsl:value-of select="/rss/channel/title"/></xsl:when>
            <xsl:when test="/*[local-name()='feed']/*[local-name()='title']"><xsl:value-of select="/*[local-name()='feed']/*[local-name()='title']"/></xsl:when>
          </xsl:choose>
          Feed
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          :root {
            /* Mapped from tokens.css */
            --bg: #181925; /* --ds-space-indigo */
            --card-bg: #2b2d42; /* --ds-shadow-grey */
            --text-primary: #FFFFFF;
            --text-secondary: #5f8594; /* --ds-airforce-blue */
            --accent: #8f006b; /* --ds-magenta */
            --accent-cyan: #92dce5; /* --ds-light-cyan */
            --border: rgba(146, 220, 229, 0.1); /* --ds-light-cyan at low opacity */
          }
          
          body {
            font-family: "muli", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: var(--bg);
            color: var(--text-primary);
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 2rem;
          }
          
          header {
            margin-bottom: 4rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 2rem;
          }
          
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0 0 1rem 0;
            letter-spacing: -0.025em;
            color: var(--accent-cyan);
          }
          
          .description {
            color: var(--text-secondary);
            font-size: 1.125rem;
          }
          
          .feed-meta {
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: var(--text-secondary);
          }
          
          .feed-meta a {
            color: var(--accent-cyan);
            text-decoration: none;
          }
          
          .post {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          }
          
          .post:hover {
            transform: translateY(-2px);
            border-color: var(--accent);
            box-shadow: 0 8px 32px rgba(143, 0, 107, 0.15);
          }
          
          .post h2 {
            margin: 0 0 0.75rem 0;
            font-size: 1.5rem;
          }
          
          .post h2 a {
            color: var(--text-primary);
            text-decoration: none;
          }
          
          .post .date {
            color: var(--accent-cyan);
            font-size: 0.875rem;
            display: block;
            margin-bottom: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .post .excerpt {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
          }
          
          .btn {
            display: inline-block;
            background: var(--accent);
            color: white;
            padding: 0.6rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.875rem;
            transition: background 0.2s ease;
          }
          
          .btn:hover {
            background: #991778; /* --ds-magenta-light */
          }
          
          .alert {
            background: rgba(146, 220, 229, 0.05);
            border: 1px solid var(--accent-cyan);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            font-size: 0.875rem;
            color: var(--accent-cyan);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>
              <xsl:choose>
                <xsl:when test="/rss/channel/title"><xsl:value-of select="/rss/channel/title"/></xsl:when>
                <xsl:when test="/*[local-name()='feed']/*[local-name()='title']"><xsl:value-of select="/*[local-name()='feed']/*[local-name()='title']"/></xsl:when>
              </xsl:choose>
            </h1>
            <p class="description">
              <xsl:choose>
                <xsl:when test="/rss/channel/description"><xsl:value-of select="/rss/channel/description"/></xsl:when>
                <xsl:when test="/*[local-name()='feed']/*[local-name()='subtitle']"><xsl:value-of select="/*[local-name()='feed']/*[local-name()='subtitle']"/></xsl:when>
              </xsl:choose>
            </p>
            <div class="feed-meta">
              This is a web feed. 
              Subscribe by copying the URL into your news reader.
            </div>
          </header>

          <div class="alert">
            <strong>Pro Tip:</strong> You are viewing the raw XML feed styled for your browser. 
            To follow this blog, use a feed reader like NetNewsWire, Feedly, or Reeder.
          </div>

          <!-- RSS Items -->
          <xsl:for-each select="/rss/channel/item">
            <article class="post">
              <h2>
                <a href="{link}">
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <span class="date">
                Published: <xsl:value-of select="pubDate"/>
              </span>
              <div class="excerpt">
                <xsl:value-of select="description" disable-output-escaping="yes"/>
              </div>
              <a href="{link}" class="btn">Read Article</a>
            </article>
          </xsl:for-each>

          <!-- Atom Items -->
          <xsl:for-each select="/*[local-name()='feed']/*[local-name()='entry']">
            <article class="post">
              <h2>
                <a href="{*[local-name()='link']/@href}">
                  <xsl:value-of select="*[local-name()='title']"/>
                </a>
              </h2>
              <span class="date">
                Updated: <xsl:value-of select="*[local-name()='updated']"/>
              </span>
              <div class="excerpt">
                <xsl:value-of select="*[local-name()='summary']" disable-output-escaping="yes"/>
              </div>
              <a href="{*[local-name()='link']/@href}" class="btn">Read Article</a>
            </article>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
