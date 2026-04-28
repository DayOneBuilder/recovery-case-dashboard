(function () {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file") || "";
  const title = document.getElementById("packet-title");
  const body = document.getElementById("packet-body");

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return entities[char];
    });
  }

  function isSafePacketPath(value) {
    return (
      /^packets\/[a-z0-9-]+\.md$/i.test(value) ||
      /^outreach\/drafts\/[a-z0-9-]+\.md$/i.test(value)
    );
  }

  function inline(text) {
    return escapeHtml(text)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
      );
  }

  function renderMarkdown(markdown) {
    const html = [];
    let inList = false;
    let inCode = false;
    const codeLines = [];

    function closeList() {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }

    for (const line of markdown.split(/\r?\n/)) {
      if (line.startsWith("```")) {
        if (inCode) {
          html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
          codeLines.length = 0;
          inCode = false;
        } else {
          closeList();
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        codeLines.push(line);
        continue;
      }

      if (!line.trim()) {
        closeList();
        continue;
      }

      if (line.startsWith("# ")) {
        closeList();
        html.push(`<h2>${inline(line.slice(2))}</h2>`);
      } else if (line.startsWith("## ")) {
        closeList();
        html.push(`<h3>${inline(line.slice(3))}</h3>`);
      } else if (line.startsWith("### ")) {
        closeList();
        html.push(`<h4>${inline(line.slice(4))}</h4>`);
      } else if (line.startsWith("- ")) {
        if (!inList) {
          html.push("<ul>");
          inList = true;
        }
        html.push(`<li>${inline(line.slice(2))}</li>`);
      } else {
        closeList();
        html.push(`<p>${inline(line)}</p>`);
      }
    }

    closeList();
    return html.join("");
  }

  if (!isSafePacketPath(file)) {
    title.textContent = "Packet unavailable";
    body.innerHTML =
      "<p>The requested packet path is missing or unsafe.</p>";
    return;
  }

  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then((markdown) => {
      const firstHeading = markdown.match(/^#\s+(.+)$/m);
      title.textContent = firstHeading ? firstHeading[1] : file;
      body.innerHTML = renderMarkdown(markdown);
    })
    .catch((error) => {
      title.textContent = "Packet unavailable";
      body.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    });
})();
