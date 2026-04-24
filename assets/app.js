(function () {
  const caseData = window.RECOVERY_CASE;
  if (!caseData) {
    document.body.innerHTML = "<p>Case data unavailable.</p>";
    return;
  }

  const caseInfo = caseData.case || caseData;
  const workstreams = caseData.workstreams || caseData.branches || [];
  const flowData = caseData.visuals?.flow || caseData.flow || { nodes: [], links: [] };
  const networkData = caseData.visuals?.network || caseData.network || { categories: [], nodes: [], links: [] };

  const statusColors = {
    confirmed: "#143d33",
    live: "#157f58",
    tracing: "#266a9f",
    constrained: "#8a6d18",
    service: "#b66a10",
    offchain: "#6d6558",
    frozen: "#3b7c92",
    unknown: "#b33a2c"
  };

  const classificationMeta = {
    "confirmed-stolen-path": {
      label: "Confirmed stolen path",
      color: "#157f58",
      lineType: "solid",
      opacity: 0.78
    },
    "investigative-lead": {
      label: "Investigative lead",
      color: "#b66a10",
      lineType: "dashed",
      opacity: 0.58
    },
    context: {
      label: "Context / source",
      color: "#6d6558",
      lineType: "dotted",
      opacity: 0.45
    }
  };

  let selectedBranchId = workstreams[0]?.id || "";
  let flowChart;
  let networkChart;

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return entities[char];
    });
  }

  function pct(value) {
    if (typeof value !== "number") return "-";
    return `${Math.round(value)}%`;
  }

  function statusLabel(status) {
    const labels = {
      confirmed: "Confirmed",
      live: "Live",
      tracing: "Tracing",
      constrained: "Constrained",
      service: "Service lead",
      offchain: "Off-chain",
      frozen: "Source",
      unknown: "Unknown"
    };
    return labels[status] || status || "Unknown";
  }

  function statusColor(status) {
    return statusColors[status] || statusColors.unknown;
  }

  function classMeta(classification) {
    return classificationMeta[classification] || classificationMeta.context;
  }

  function className(classification) {
    return String(classification || "context").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  }

  function classificationLabel(classification) {
    return classMeta(classification).label;
  }

  function classificationPill(classification) {
    return `<span class="class-pill class-${className(classification)}">${escapeHtml(classificationLabel(classification))}</span>`;
  }

  function confidenceText(value) {
    return typeof value === "number" ? `${Math.round(value)}%` : "-";
  }

  function sourceUrl(url) {
    const value = String(url || "");
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return "#";
  }

  function initHeader() {
    byId("case-title").textContent = caseInfo.title;
    byId("case-subtitle").textContent = caseInfo.subtitle;
    byId("last-review").textContent = caseInfo.lastReview || caseData.review?.last || "-";
    byId("next-review").textContent = `Next review: ${caseInfo.nextReview || caseData.review?.next || "-"}`;
  }

  function renderExploitBrief() {
    const exploit = caseData.exploit || {};
    const stolenTotal = exploit.stolenTotal || {};
    const stolenItems = exploit.whatWasStolen || [];

    byId("exploit-brief").innerHTML = `
      <div class="exploit-copy">
        <p class="eyebrow">${escapeHtml(exploit.title || "Exploit / theft")}</p>
        <h2>${escapeHtml(exploit.severity || "Confirmed theft")}</h2>
        <p>${escapeHtml(exploit.theftVector || "")}</p>
      </div>
      <div class="exploit-total">
        <span>${escapeHtml(stolenTotal.label || "Stolen total")}</span>
        <strong>${escapeHtml(stolenTotal.value || "-")}</strong>
        <small>${escapeHtml(stolenTotal.note || "")}</small>
      </div>
      <div class="stolen-list" aria-label="What was stolen">
        ${stolenItems
          .map(
            (item) => `
              <article class="stolen-item">
                <span>${escapeHtml(item.asset)}</span>
                <strong>${escapeHtml(item.amount)}</strong>
                ${classificationPill(item.classification)}
                <small>${escapeHtml(item.note)}</small>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderTopSummary() {
    byId("top-summary").innerHTML = (caseData.topSummary || [])
      .map((item) => {
        const color = statusColor(item.status);
        return `
          <article class="summary-metric" style="--metric-color: ${color}">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.caption)}</small>
            <em>${escapeHtml(statusLabel(item.status))} ${escapeHtml(confidenceText(item.confidence))}</em>
          </article>
        `;
      })
      .join("");
  }

  function renderPriorityActions() {
    byId("priority-actions").innerHTML = (caseData.priorityActions || [])
      .map(
        (item) => `
          <article class="action-row">
            <div class="action-rank">${escapeHtml(item.priority)}</div>
            <div class="action-main">
              <strong>${escapeHtml(item.action)}</strong>
              <span>${escapeHtml(item.target)}</span>
            </div>
            <div class="action-owner">
              <span>Owner</span>
              <strong>${escapeHtml(item.owner)}</strong>
            </div>
            <p>${escapeHtml(item.why)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderFundLocations() {
    const branchIds = new Set(workstreams.map((branch) => branch.id));
    byId("funds-now").innerHTML = `
      <table class="funds-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Location</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Confidence</th>
            <th>Classification</th>
            <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          ${(caseData.fundLocations || [])
            .map((item) => {
              const canSelect = branchIds.has(item.id);
              const location = canSelect
                ? `<button class="text-button" type="button" data-fund-workstream="${escapeHtml(item.id)}">${escapeHtml(item.location)}</button>`
                : `<span>${escapeHtml(item.location)}</span>`;
              return `
                <tr>
                  <td data-label="Asset"><strong>${escapeHtml(item.asset)}</strong></td>
                  <td data-label="Location">${location}</td>
                  <td data-label="Amount">${escapeHtml(item.amount)}</td>
                  <td data-label="Status"><span class="status-chip" style="--chip-color:${statusColor(item.statusKey)}">${escapeHtml(item.status)}</span></td>
                  <td data-label="Confidence">${escapeHtml(confidenceText(item.confidence))}</td>
                  <td data-label="Classification">${classificationPill(item.classification)}</td>
                  <td data-label="Next action">${escapeHtml(item.nextAction)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;

    document.querySelectorAll("[data-fund-workstream]").forEach((button) => {
      button.addEventListener("click", () => selectBranch(button.dataset.fundWorkstream));
    });
  }

  function renderLegend() {
    const classifications = Array.from(
      new Set([...flowData.nodes, ...flowData.links].map((item) => item.classification || "context"))
    );

    byId("status-legend").innerHTML = classifications
      .map((classification) => {
        const meta = classMeta(classification);
        return `
          <span class="legend-item">
            <i class="legend-line legend-${className(classification)}" style="--legend-color:${meta.color}"></i>
            ${escapeHtml(meta.label)}
          </span>
        `;
      })
      .join("");
  }

  function initFlowChart() {
    if (!window.echarts) {
      byId("flow-chart").textContent = "Chart library unavailable.";
      return;
    }

    flowChart = echarts.init(byId("flow-chart"), null, { renderer: "svg" });
    const compactFlow = byId("flow-chart").clientWidth < 620;
    const nodes = flowData.nodes.map((node) => {
      const meta = classMeta(node.classification);
      return {
        name: node.name,
        x: compactFlow ? node.mobileX : node.x,
        y: compactFlow ? node.mobileY : node.y,
        symbol: node.classification === "investigative-lead" ? "diamond" : "circle",
        symbolSize: compactFlow ? node.mobileSize || 38 : node.size || 48,
        tooltip: `${escapeHtml(node.tooltip || node.name)}<br>${escapeHtml(meta.label)}`,
        itemStyle: {
          color: statusColor(node.status),
          borderColor: meta.color,
          borderWidth: node.classification === "investigative-lead" ? 4 : 2
        },
        label: {
          show: true,
          formatter: node.label || node.name,
          color: "#151a17",
          fontSize: compactFlow ? 10 : 12,
          fontWeight: 700,
          position: compactFlow ? node.mobileLabelPosition || "right" : node.labelPosition || "bottom",
          width: compactFlow ? 104 : 130,
          overflow: "break"
        }
      };
    });

    flowChart.setOption({
      tooltip: {
        trigger: "item",
        formatter(params) {
          if (params.dataType === "edge" || params.data.source) {
            const meta = classMeta(params.data.classification);
            return `${escapeHtml(params.data.source)} -> ${escapeHtml(params.data.target)}<br><b>${escapeHtml(params.data.label || params.data.value)}</b><br>${escapeHtml(meta.label)}`;
          }
          return params.data.tooltip || escapeHtml(params.name);
        }
      },
      series: [
        {
          type: "graph",
          layout: "none",
          data: nodes,
          links: flowData.links.map((link) => {
            const meta = classMeta(link.classification);
            return {
              ...link,
              lineStyle: {
                color: meta.color || statusColor(link.status),
                type: meta.lineType,
                width: link.width || Math.max(2, Math.min(14, link.value / 4)),
                curveness: link.curveness ?? 0.18,
                opacity: meta.opacity
              },
              label: {
                show: false,
                formatter: link.label,
                color: "#4b554e",
                fontSize: 11
              }
            };
          }),
          roam: false,
          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: [0, 9],
          emphasis: { focus: "adjacency" }
        }
      ]
    });
  }

  function initNetworkChart() {
    if (!window.echarts) {
      byId("network-chart").textContent = "Chart library unavailable.";
      return;
    }

    networkChart = echarts.init(byId("network-chart"), null, { renderer: "svg" });
    const categories = networkData.categories.map((name) => ({ name }));
    const nodes = networkData.nodes.map((node) => {
      const meta = classMeta(node.classification);
      return {
        ...node,
        symbol: node.classification === "investigative-lead" ? "diamond" : "circle",
        symbolSize: node.size,
        itemStyle: {
          color: statusColor(node.status),
          borderColor: meta.color,
          borderWidth: node.classification === "investigative-lead" ? 4 : 2
        },
        label: { show: true, formatter: node.label || node.name }
      };
    });

    networkChart.setOption({
      tooltip: {
        formatter(params) {
          if (params.data?.source) {
            return `${escapeHtml(params.data.source)} -> ${escapeHtml(params.data.target)}<br>${escapeHtml(params.data.value || "")}<br>${escapeHtml(classificationLabel(params.data.classification))}`;
          }
          return `${escapeHtml(params.data.tooltip || params.name)}<br>${escapeHtml(classificationLabel(params.data.classification))}`;
        }
      },
      legend: {
        bottom: 0,
        textStyle: { color: "#607067" }
      },
      series: [
        {
          type: "graph",
          layout: "force",
          categories,
          data: nodes,
          links: networkData.links.map((link) => {
            const meta = classMeta(link.classification);
            return {
              ...link,
              lineStyle: {
                color: meta.color,
                type: meta.lineType,
                opacity: meta.opacity,
                width: link.classification === "investigative-lead" ? 2.5 : 2
              }
            };
          }),
          roam: true,
          draggable: true,
          force: {
            repulsion: 260,
            edgeLength: [70, 160]
          },
          label: {
            color: "#151a17",
            fontSize: 11
          },
          edgeLabel: {
            show: false
          }
        }
      ]
    });
  }

  function selectBranch(id) {
    if (!workstreams.some((branch) => branch.id === id)) return;
    selectedBranchId = id;
    renderBranchList();
    renderSelectedBranch();
  }

  function renderBranchList() {
    byId("branch-list").innerHTML = workstreams
      .map((branch) => {
        const active = branch.id === selectedBranchId ? " active" : "";
        return `
          <button class="branch-card${active}" type="button" data-workstream="${escapeHtml(branch.id)}">
            <div class="branch-card-top">
              <strong>${escapeHtml(branch.name)}</strong>
              ${classificationPill(branch.classification)}
            </div>
            <span>${escapeHtml(branch.summary)}</span>
            <div class="mini-grid">
              <span class="mini-score"><b>${escapeHtml(pct(branch.scores.recovery))}</b><small>Recovery</small></span>
              <span class="mini-score"><b>${escapeHtml(pct(branch.scores.ownerId))}</b><small>Owner ID</small></span>
              <span class="mini-score"><b>${escapeHtml(pct(branch.scores.confidence))}</b><small>Confidence</small></span>
            </div>
          </button>
        `;
      })
      .join("");

    document.querySelectorAll("[data-workstream]").forEach((button) => {
      button.addEventListener("click", () => selectBranch(button.dataset.workstream));
    });
  }

  function renderSelectedBranch() {
    const branch = workstreams.find((item) => item.id === selectedBranchId);
    if (!branch) return;

    const color = statusColor(branch.status);
    byId("branch-title").textContent = branch.name;
    byId("branch-status").textContent = statusLabel(branch.status);
    byId("branch-status").style.background = color;
    byId("branch-classification").textContent = classificationLabel(branch.classification);
    byId("branch-classification").className = `class-pill class-${className(branch.classification)}`;
    byId("branch-summary").textContent = branch.summary;
    byId("branch-action").textContent = branch.nextAction;

    byId("branch-scores").innerHTML = [
      ["Recovery chance", branch.scores.recovery, statusColors.live],
      ["Owner ID chance", branch.scores.ownerId, statusColors.service],
      ["Actionability", branch.scores.actionability, statusColors.tracing],
      ["Confidence", branch.scores.confidence, statusColors.constrained]
    ]
      .map(([label, value, scoreColor]) => {
        return `
          <div class="score-row">
            <div class="score-label"><span>${escapeHtml(label)}</span><strong>${escapeHtml(pct(value))}</strong></div>
            <div class="score-bar"><span style="width:${escapeHtml(value)}%; --score-color:${scoreColor}"></span></div>
          </div>
        `;
      })
      .join("");

    byId("branch-details").innerHTML = (branch.details || [])
      .map((detail) => {
        return `<div><dt>${escapeHtml(detail.label)}</dt><dd>${escapeHtml(detail.value)}</dd></div>`;
      })
      .join("");
  }

  function renderTimeline() {
    byId("timeline").innerHTML = (caseData.timeline || [])
      .map((event) => {
        const color = statusColor(event.status);
        return `
          <li style="--event-color: ${color}">
            <div class="timeline-top">
              <time>${escapeHtml(event.date)}</time>
              ${classificationPill(event.classification)}
            </div>
            <strong>${escapeHtml(event.title)}</strong>
            <p>${escapeHtml(event.text)}</p>
          </li>
        `;
      })
      .join("");
  }

  function renderNotes() {
    byId("notes").innerHTML = (caseData.notes || [])
      .map((note) => {
        return `
          <article class="note">
            <div class="note-header">
              <strong>${escapeHtml(note.author)}</strong>
              <span>${escapeHtml(note.date)}</span>
            </div>
            <p>${escapeHtml(note.text)}</p>
          </article>
        `;
      })
      .join("");
  }

  function renderSources() {
    byId("sources").innerHTML = (caseData.sources || [])
      .map((source) => `<a href="${escapeHtml(sourceUrl(source.url))}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`)
      .join("");
  }

  function resizeCharts() {
    flowChart && flowChart.resize();
    networkChart && networkChart.resize();
  }

  function init() {
    initHeader();
    renderExploitBrief();
    renderTopSummary();
    renderPriorityActions();
    renderFundLocations();
    renderLegend();
    initFlowChart();
    initNetworkChart();
    renderBranchList();
    renderSelectedBranch();
    renderTimeline();
    renderNotes();
    renderSources();
    window.addEventListener("resize", resizeCharts);
  }

  init();
})();
