(function () {
  const caseData = window.RECOVERY_CASE;
  const statusColors = {
    live: "#157f58",
    tracing: "#266a9f",
    constrained: "#8a6d18",
    service: "#b66a10",
    offchain: "#6d6558",
    frozen: "#3b7c92",
    unknown: "#b33a2c"
  };

  const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const precise = new Intl.NumberFormat("en-US", { maximumFractionDigits: 8 });

  let selectedBranchId = caseData.branches[0].id;
  let flowChart;
  let networkChart;

  function byId(id) {
    return document.getElementById(id);
  }

  function pct(value) {
    return `${Math.round(value)}%`;
  }

  function amountText(item) {
    if (item.displayAmount) return item.displayAmount;
    if (item.asset === "BTC") return `${precise.format(item.amount)} BTC`;
    if (item.asset === "CIOTX") return `${money.format(item.amount)} CIOTX`;
    if (item.asset === "USD") return `$${money.format(item.amount)}`;
    return `${money.format(item.amount)} ${item.asset || ""}`.trim();
  }

  function statusLabel(status) {
    const labels = {
      live: "Live",
      tracing: "Tracing",
      constrained: "Constrained",
      service: "Service hit",
      offchain: "Off-chain",
      frozen: "Frozen",
      unknown: "Unknown"
    };
    return labels[status] || status;
  }

  function initHeader() {
    byId("case-title").textContent = caseData.title;
    byId("case-subtitle").textContent = caseData.subtitle;
    byId("last-review").textContent = caseData.review.last;
    byId("next-review").textContent = `Next review: ${caseData.review.next}`;
  }

  function renderMetrics() {
    byId("score-strip").innerHTML = caseData.metrics
      .map((metric) => {
        const color = metric.color || statusColors[metric.status] || statusColors.live;
        return `
          <article class="metric" style="--metric-color: ${color}">
            <span>${metric.label}</span>
            <strong>${metric.value}</strong>
            <small>${metric.caption}</small>
          </article>
        `;
      })
      .join("");
  }

  function renderLegend() {
    const statuses = Array.from(new Set(caseData.branches.map((branch) => branch.status)));
    byId("status-legend").innerHTML = statuses
      .map((status) => {
        const color = statusColors[status] || statusColors.unknown;
        return `<span class="legend-item"><i class="legend-dot" style="background:${color}"></i>${statusLabel(status)}</span>`;
      })
      .join("");
  }

  function initFlowChart() {
    flowChart = echarts.init(byId("flow-chart"), null, { renderer: "svg" });
    const compactFlow = byId("flow-chart").clientWidth < 620;
    const nodes = caseData.flow.nodes.map((node) => ({
      name: node.name,
      x: compactFlow ? node.mobileX : node.x,
      y: compactFlow ? node.mobileY : node.y,
      symbolSize: compactFlow ? node.mobileSize || 38 : node.size || 48,
      itemStyle: {
        color: statusColors[node.status] || statusColors.unknown,
        borderColor: "#fffdf7",
        borderWidth: 3
      },
      label: {
        show: true,
        formatter: node.label || node.name,
        color: "#171512",
        fontSize: compactFlow ? 10 : 12,
        fontWeight: 700,
        position: compactFlow ? node.mobileLabelPosition || "right" : node.labelPosition || "bottom",
        width: compactFlow ? 104 : 130,
        overflow: "break"
      }
    }));

    flowChart.setOption({
      tooltip: {
        trigger: "item",
        formatter(params) {
          if (params.dataType === "edge" || params.data.source) {
            return `${params.data.source} -> ${params.data.target}<br><b>${params.data.label || params.data.value}</b>`;
          }
          return params.data.tooltip || params.name;
        }
      },
      series: [
        {
          type: "graph",
          layout: "none",
          data: nodes,
          links: caseData.flow.links.map((link) => ({
            ...link,
            lineStyle: {
              color: statusColors[link.status] || "#8f806a",
              width: link.width || Math.max(2, Math.min(14, link.value / 4)),
              curveness: link.curveness ?? 0.18,
              opacity: 0.72
            },
            label: {
              show: false,
              formatter: link.label,
              color: "#4f4638",
              fontSize: 11
            }
          })),
          roam: false,
          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: [0, 9],
          emphasis: { focus: "adjacency" },
          lineStyle: {
            color: "#8f806a",
            opacity: 0.7
          }
        }
      ]
    });
  }

  function initNetworkChart() {
    networkChart = echarts.init(byId("network-chart"), null, { renderer: "svg" });
    const categories = caseData.network.categories.map((name) => ({ name }));
    const nodes = caseData.network.nodes.map((node) => ({
      ...node,
      symbolSize: node.size,
      itemStyle: { color: statusColors[node.status] || node.color || statusColors.unknown },
      label: { show: true, formatter: node.label || node.name }
    }));

    networkChart.setOption({
      tooltip: {
        formatter(params) {
          return params.data.tooltip || params.name;
        }
      },
      legend: {
        bottom: 0,
        textStyle: { color: "#6d6558" }
      },
      series: [
        {
          type: "graph",
          layout: "force",
          categories,
          data: nodes,
          links: caseData.network.links,
          roam: true,
          draggable: true,
          force: {
            repulsion: 260,
            edgeLength: [70, 160]
          },
          label: {
            color: "#171512",
            fontSize: 11
          },
          edgeLabel: {
            show: false
          },
          lineStyle: {
            color: "source",
            curveness: 0.18,
            opacity: 0.62
          }
        }
      ]
    });
  }

  function renderBranchList() {
    byId("branch-list").innerHTML = caseData.branches
      .map((branch) => {
        const active = branch.id === selectedBranchId ? " active" : "";
        return `
          <button class="branch-card${active}" type="button" data-branch="${branch.id}">
            <strong>${branch.name}</strong>
            <span>${branch.summary}</span>
            <div class="mini-grid">
              <span class="mini-score"><b>${pct(branch.scores.recovery)}</b><small>Recovery</small></span>
              <span class="mini-score"><b>${pct(branch.scores.ownerId)}</b><small>Owner ID</small></span>
              <span class="mini-score"><b>${pct(branch.scores.confidence)}</b><small>Confidence</small></span>
            </div>
          </button>
        `;
      })
      .join("");

    document.querySelectorAll("[data-branch]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedBranchId = button.dataset.branch;
        renderBranchList();
        renderSelectedBranch();
      });
    });
  }

  function renderSelectedBranch() {
    const branch = caseData.branches.find((item) => item.id === selectedBranchId);
    const color = statusColors[branch.status] || statusColors.unknown;
    byId("branch-title").textContent = branch.name;
    byId("branch-status").textContent = statusLabel(branch.status);
    byId("branch-status").style.background = color;
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
            <div class="score-label"><span>${label}</span><strong>${pct(value)}</strong></div>
            <div class="score-bar"><span style="width:${value}%; --score-color:${scoreColor}"></span></div>
          </div>
        `;
      })
      .join("");

    byId("branch-details").innerHTML = branch.details
      .map((detail) => {
        return `<div><dt>${detail.label}</dt><dd>${detail.value}</dd></div>`;
      })
      .join("");
  }

  function renderTimeline() {
    byId("timeline").innerHTML = caseData.timeline
      .map((event) => {
        const color = statusColors[event.status] || statusColors.tracing;
        return `
          <li style="--event-color: ${color}">
            <time>${event.date}</time>
            <strong>${event.title}</strong>
            <p>${event.text}</p>
          </li>
        `;
      })
      .join("");
  }

  function renderNotes() {
    byId("notes").innerHTML = caseData.notes
      .map((note) => {
        return `
          <article class="note">
            <div class="note-header">
              <strong>${note.author}</strong>
              <span>${note.date}</span>
            </div>
            <p>${note.text}</p>
          </article>
        `;
      })
      .join("");
  }

  function renderSources() {
    byId("sources").innerHTML = caseData.sources
      .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`)
      .join("");
  }

  function resizeCharts() {
    flowChart && flowChart.resize();
    networkChart && networkChart.resize();
  }

  function init() {
    initHeader();
    renderMetrics();
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
