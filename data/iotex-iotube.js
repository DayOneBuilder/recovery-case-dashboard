window.RECOVERY_CASE = {
  schemaVersion: "2.0",
  id: "iotex-iotube",
  case: {
    title: "IoTeX ioTube Recovery Dashboard",
    subtitle:
      "Product view of the ioTube bridge incident: what was stolen, where funds are now, what is confirmed, what is only a lead, and what to do next.",
    victim: "IoTeX ioTube bridge",
    incidentDate: "2026-02-21",
    lastReview: "2026-04-27",
    nextReview: "2026-04-27",
    publicMode: true
  },
  exploit: {
    title: "Exploit / theft",
    severity: "Confirmed bridge reserve drain and CIOTX mint branch",
    theftVector:
      "Validator owner compromise and malicious upgrade enabled the reserve drain and a CIOTX mint branch.",
    stolenTotal: {
      label: "Estimated stolen total",
      value: "~$4.4M",
      status: "confirmed",
      confidence: 82,
      note:
        "Public reserve-drain estimate before private recovery accounting and before any price movement adjustments."
    },
    whatWasStolen: [
      {
        id: "eth-reserve-drain",
        asset: "ETH",
        amount: "1,464.4077 ETH",
        classification: "confirmed-stolen-path",
        confidence: 92,
        note: "Reserve-drain EOA sent 17 direct THORChain router deposits."
      },
      {
        id: "btc-thorchain-output",
        asset: "BTC",
        amount: "~66.78 BTC",
        classification: "confirmed-stolen-path",
        confidence: 90,
        note: "IoTeX-published BTC landing set after the THORChain route."
      },
      {
        id: "ciotx-mint-branch",
        asset: "CIOTX",
        amount: "128.8M+ CIOTX branch",
        classification: "confirmed-stolen-path",
        confidence: 88,
        note: "Public recovery updates identify visible and venue-dependent CIOTX branches."
      }
    ]
  },
  topSummary: [
    {
      id: "stolen-total",
      label: "Stolen total",
      value: "~$4.4M",
      status: "confirmed",
      confidence: 82,
      caption: "Public reserve-drain estimate; exact USD value depends on pricing and recovery accounting."
    },
    {
      id: "visible-on-chain-now",
      label: "Visible on-chain now",
      value: "22.863073 BTC + 76,448,785 CIOTX",
      status: "live",
      confidence: 94,
      caption: "Four BTC landing addresses plus the 0xA467 Ethereum-side CIOTX tail."
    },
    {
      id: "constrained-frozen-value",
      label: "Constrained / frozen value",
      value: "76.4M CIOTX",
      status: "constrained",
      confidence: 95,
      caption: "Visible on 0xA467; recovery depends on IoTeX and exchange controls."
    },
    {
      id: "venue-dependent-value",
      label: "Off-chain / venue-dependent",
      value: "52.4M CIOTX",
      status: "offchain",
      confidence: 82,
      caption: "IoTeX-reported branch involving Binance and trading partners."
    },
    {
      id: "best-investigative-lead",
      label: "Best investigative lead",
      value: "bc1q7t4v service-like cluster",
      status: "service",
      confidence: 70,
      caption: "Owner-attribution lead; not publicly labeled to a named exchange."
    }
  ],
  priorityActions: [
    {
      id: "preserve-venue-ciotx",
      priority: 1,
      owner: "IoTeX / counsel",
      action: "Preserve and request venue records for the Binance, Easybit, and ChangeNow CIOTX branch.",
      target: "52.4M CIOTX venue-dependent branch",
      why: "Only the venues or legal process can connect off-chain balances, KYC, and freeze state."
    },
    {
      id: "watch-live-btc",
      priority: 2,
      owner: "Analyst",
      action: "Keep the original BTC tail and 1EGcRh second-hop address on immediate movement watch.",
      target: "22.863073 BTC tail plus 2.879058 BTC linked input",
      why: "A new spend is the fastest path to a fresh venue, mixer, or consolidation signal."
    },
    {
      id: "escalate-service-lead",
      priority: 3,
      owner: "IoTeX / analytics vendor",
      action: "Run owner-attribution on bc1q7t4v and its cluster before sending any public claim.",
      target: "0.75 BTC service-like cluster touch",
      why: "This is the strongest lead, but it is not yet a confirmed named service."
    },
    {
      id: "protect-claim-boundaries",
      priority: 4,
      owner: "Case lead",
      action: "Keep every report split between confirmed stolen path and investigative lead.",
      target: "All public and vendor-facing updates",
      why: "The second-hop balance is mixed-use and the service-like cluster is unlabeled."
    }
  ],
  fundLocations: [
    {
      id: "btc-original-tail",
      asset: "BTC",
      location: "12V7..., 16xus..., 1PN2..., 135o...",
      amount: "22.863073 BTC",
      status: "Live on-chain",
      statusKey: "live",
      confidence: 94,
      classification: "confirmed-stolen-path",
      nextAction: "Keep top watchlist; any spend becomes an immediate venue-identification event.",
      evidenceRefs: ["btc-12v7", "btc-16xus", "btc-1pn2", "btc-135o"]
    },
    {
      id: "btc-second-hop",
      asset: "BTC",
      location: "1EGcRhfss16hxHTZVcNcnBdpYWbcxFAgQ8",
      amount: "2.879058 BTC linked; 4.79142054 BTC address balance",
      status: "Live, mixed-use caveat",
      statusKey: "tracing",
      confidence: 72,
      classification: "confirmed-stolen-path",
      nextAction: "Report only the linked input as IoTeX proceeds; keep watching for movement.",
      evidenceRefs: ["btc-1egcrh"]
    },
    {
      id: "btc-service-lead",
      asset: "BTC",
      location: "bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz",
      amount: "0.75 BTC touch",
      status: "Service-like cluster lead",
      statusKey: "service",
      confidence: 70,
      classification: "investigative-lead",
      nextAction: "Service-like cluster spend activity continues, with another confirmed hop at 02:55 UTC on 2026-04-27, so keep tagging fresh outputs and ask for operator attribution.",
      evidenceRefs: ["btc-service-cluster", "btc-service-touch-tx", "btc-service-touch-tx-2", "btc-service-touch-tx-3", "btc-service-touch-tx-4", "btc-service-touch-tx-5", "btc-service-touch-tx-6", "btc-service-touch-tx-7", "btc-service-touch-tx-8", "btc-service-touch-tx-9"]
    },
    {
      id: "btc-other-spent",
      asset: "BTC",
      location: "Other spent BTC peel branches",
      amount: "~40.287869 BTC spent onward",
      status: "Unresolved tracing",
      statusKey: "unknown",
      confidence: 55,
      classification: "investigative-lead",
      nextAction: "Bucket peel chains by destination type and promote only confirmed venue hits.",
      evidenceRefs: ["iotex-incident-update"]
    },
    {
      id: "ciotx-tail",
      asset: "CIOTX",
      location: "0xA467a6c7cA8e812E997bfe50Ce4E7991aAd00A88",
      amount: "76,448,785 CIOTX",
      status: "Visible / constrained",
      statusKey: "constrained",
      confidence: 95,
      classification: "confirmed-stolen-path",
      nextAction: "Track outbound transfers and cross-check with IoTeX chain and exchange controls.",
      evidenceRefs: ["ciotx-a467"]
    },
    {
      id: "ciotx-venue-branch",
      asset: "CIOTX",
      location: "Binance / Easybit / ChangeNow branch",
      amount: "52.4M CIOTX reported",
      status: "Off-chain / venue-dependent",
      statusKey: "offchain",
      confidence: 82,
      classification: "confirmed-stolen-path",
      nextAction: "Ask IoTeX whether preservation, freeze, or settlement is already in process.",
      evidenceRefs: ["iotex-month-review", "iotex-update-2"]
    }
  ],
  visuals: {
    flow: {
      nodes: [
        { name: "Reserve drain ETH", label: "Reserve drain\nETH", status: "unknown", classification: "confirmed-stolen-path", x: 40, y: 130, size: 64, mobileX: 40, mobileY: 55, mobileLabelPosition: "right" },
        { name: "THORChain router", label: "THORChain\nrouter", status: "tracing", classification: "confirmed-stolen-path", x: 220, y: 130, size: 58, mobileX: 40, mobileY: 125, mobileLabelPosition: "right" },
        { name: "BTC landing set", label: "4 BTC\nlanding addrs", status: "live", classification: "confirmed-stolen-path", x: 400, y: 130, size: 68, mobileX: 40, mobileY: 205, mobileLabelPosition: "right" },
        { name: "Original BTC tail", label: "22.863073 BTC\nstill visible", status: "live", classification: "confirmed-stolen-path", x: 620, y: 54, size: 62, mobileX: 238, mobileY: 162, mobileLabelPosition: "left" },
        { name: "Spent BTC peel", label: "spent BTC\npeel map", status: "tracing", classification: "confirmed-stolen-path", x: 620, y: 196, size: 60, mobileX: 238, mobileY: 252, mobileLabelPosition: "left" },
        { name: "1EGcRh live second-hop", label: "1EGcRh\nlinked input", status: "tracing", classification: "confirmed-stolen-path", x: 820, y: 112, size: 54, mobileX: 238, mobileY: 342, mobileLabelPosition: "left" },
        { name: "bc1q7t4v service-like hit", label: "bc1q7t4v\nlead", status: "service", classification: "investigative-lead", x: 1010, y: 196, size: 58, mobileX: 238, mobileY: 438, mobileLabelPosition: "left" },
        { name: "Other spent BTC branches", label: "other spent\nbranches", status: "unknown", classification: "investigative-lead", x: 820, y: 278, size: 52, mobileX: 40, mobileY: 342, mobileLabelPosition: "right" },
        { name: "CIOTX mint branch", label: "CIOTX\nmint branch", status: "constrained", classification: "confirmed-stolen-path", x: 220, y: 330, size: 58, mobileX: 40, mobileY: 540, mobileLabelPosition: "right" },
        { name: "0xA467 visible CIOTX", label: "0xA467\n76.4M CIOTX", status: "constrained", classification: "confirmed-stolen-path", x: 500, y: 330, size: 58, mobileX: 238, mobileY: 540, mobileLabelPosition: "left" },
        { name: "Binance / partners", label: "Binance /\npartners", status: "offchain", classification: "confirmed-stolen-path", x: 760, y: 330, size: 54, mobileX: 238, mobileY: 625, mobileLabelPosition: "left" }
      ],
      links: [
        { source: "Reserve drain ETH", target: "THORChain router", value: 66.78, width: 12, status: "tracing", classification: "confirmed-stolen-path", label: "1,464 ETH" },
        { source: "THORChain router", target: "BTC landing set", value: 66.78, width: 12, status: "tracing", classification: "confirmed-stolen-path", label: "~66.78 BTC" },
        { source: "BTC landing set", target: "Original BTC tail", value: 22.863073, width: 8, status: "live", classification: "confirmed-stolen-path", label: "22.86 BTC live" },
        { source: "BTC landing set", target: "Spent BTC peel", value: 43.916927, width: 10, status: "tracing", classification: "confirmed-stolen-path", label: "43.92 BTC spent" },
        { source: "Spent BTC peel", target: "1EGcRh live second-hop", value: 2.879058, width: 5, status: "tracing", classification: "confirmed-stolen-path", label: "2.879 BTC linked" },
        { source: "Spent BTC peel", target: "bc1q7t4v service-like hit", value: 0.75, width: 4, status: "service", classification: "investigative-lead", label: "0.75 BTC lead" },
        { source: "Spent BTC peel", target: "Other spent BTC branches", value: 40.287869, width: 8, status: "unknown", classification: "investigative-lead", label: "other branches" },
        { source: "CIOTX mint branch", target: "0xA467 visible CIOTX", value: 76.448785, width: 8, status: "constrained", classification: "confirmed-stolen-path", label: "76.4M CIOTX" },
        { source: "CIOTX mint branch", target: "Binance / partners", value: 52.4, width: 7, status: "offchain", classification: "confirmed-stolen-path", label: "52.4M CIOTX" }
      ]
    },
    network: {
      categories: ["Victim", "Confirmed path", "Investigative lead", "Venue / off-chain", "Source"],
      nodes: [
        { name: "IoTeX ioTube", label: "IoTeX", category: 0, size: 54, status: "live", classification: "confirmed-stolen-path", tooltip: "Victim protocol" },
        { name: "0x6487 reserve drain", label: "0x6487", category: 1, size: 38, status: "tracing", classification: "confirmed-stolen-path", tooltip: "Ethereum reserve-drain EOA" },
        { name: "THORChain router", category: 1, size: 42, status: "tracing", classification: "confirmed-stolen-path", tooltip: "17 direct depositWithExpiry transactions" },
        { name: "BTC landing addresses", label: "4 BTC landings", category: 1, size: 48, status: "live", classification: "confirmed-stolen-path", tooltip: "22.863073 BTC remains" },
        { name: "1EGcRh", category: 1, size: 34, status: "tracing", classification: "confirmed-stolen-path", tooltip: "2.879058 BTC linked input; full balance is mixed-use" },
        { name: "bc1q7t4v", category: 2, size: 46, status: "service", classification: "investigative-lead", tooltip: "313,801 txs; 599,707+ BTC lifetime funded volume" },
        { name: "Other BTC peels", category: 2, size: 30, status: "unknown", classification: "investigative-lead", tooltip: "Unresolved spent BTC branches" },
        { name: "0xA467 CIOTX", label: "0xA467", category: 1, size: 40, status: "constrained", classification: "confirmed-stolen-path", tooltip: "76,448,785 CIOTX visible" },
        { name: "Binance / partners", category: 3, size: 34, status: "offchain", classification: "confirmed-stolen-path", tooltip: "52.4M CIOTX branch per IoTeX update" },
        { name: "IoTeX updates", category: 4, size: 24, status: "frozen", classification: "context", tooltip: "Public incident reports" }
      ],
      links: [
        { source: "IoTeX ioTube", target: "0x6487 reserve drain", value: "drain", classification: "confirmed-stolen-path" },
        { source: "0x6487 reserve drain", target: "THORChain router", value: "1,464 ETH", classification: "confirmed-stolen-path" },
        { source: "THORChain router", target: "BTC landing addresses", value: "~66.78 BTC", classification: "confirmed-stolen-path" },
        { source: "BTC landing addresses", target: "1EGcRh", value: "2.879 BTC linked input", classification: "confirmed-stolen-path" },
        { source: "BTC landing addresses", target: "bc1q7t4v", value: "0.75 BTC lead", classification: "investigative-lead" },
        { source: "BTC landing addresses", target: "Other BTC peels", value: "unresolved branches", classification: "investigative-lead" },
        { source: "IoTeX ioTube", target: "0xA467 CIOTX", value: "CIOTX branch", classification: "confirmed-stolen-path" },
        { source: "0xA467 CIOTX", target: "Binance / partners", value: "52.4M reported", classification: "confirmed-stolen-path" },
        { source: "IoTeX updates", target: "BTC landing addresses", value: "published addresses", classification: "context" },
        { source: "IoTeX updates", target: "Binance / partners", value: "public recovery update", classification: "context" }
      ]
    }
  },
  workstreams: [
    {
      id: "btc-original-tail",
      name: "Original BTC tail",
      status: "live",
      classification: "confirmed-stolen-path",
      summary: "Four IoTeX-published BTC addresses still hold 22.863073 BTC with no mempool movement at the last review.",
      scores: { recovery: 58, ownerId: 48, actionability: 72, confidence: 94 },
      nextAction: "Keep this as the top watchlist. Any new spend becomes an immediate venue-identification event.",
      details: [
        { label: "Amount", value: "22.863073 BTC" },
        { label: "Addresses", value: "12V7..., 16xus..., 1PN2..., 135o..." },
        { label: "Last check", value: "2026-04-24 via mempool.space" },
        { label: "Claim boundary", value: "Confirmed stolen path; no new spend since the last review." }
      ],
      evidenceRefs: ["btc-12v7", "btc-16xus", "btc-1pn2", "btc-135o"]
    },
    {
      id: "btc-second-hop",
      name: "1EGcRh live second-hop",
      status: "tracing",
      classification: "confirmed-stolen-path",
      summary: "Second-hop address with a 4.79142054 BTC balance; 2.879058 BTC is directly tied to the 12V7 peel branch.",
      scores: { recovery: 45, ownerId: 50, actionability: 64, confidence: 72 },
      nextAction: "Watch for movement and separate the IoTeX-linked input from the later mixed-use funding in any report.",
      details: [
        { label: "Address", value: "1EGcRhfss16hxHTZVcNcnBdpYWbcxFAgQ8" },
        { label: "Balance", value: "4.79142054 BTC" },
        { label: "Linked input", value: "2.879058 BTC from 12V7... peel branch" },
        { label: "Claim boundary", value: "Do not claim the full address balance is IoTeX proceeds." }
      ],
      evidenceRefs: ["btc-1egcrh"]
    },
    {
      id: "btc-service-lead",
      name: "bc1q7t4v service-like cluster",
      status: "service",
      classification: "investigative-lead",
      summary: "A 0.75 BTC branch from the IoTeX peel touched a huge active cluster. Multiple follow-up spends were observed on 2026-04-26, with additional confirmed hops on 2026-04-27 (latest at 02:55 UTC), and it remains the best owner-attribution lead.",
      scores: { recovery: 30, ownerId: 68, actionability: 76, confidence: 70 },
      nextAction: "Push this address to IoTeX or an analytics vendor and ask whether they can identify the operator.",
      details: [
        { label: "Address", value: "bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz" },
        { label: "Touch amount", value: "0.75 BTC from bc1qpn94... branch" },
        { label: "Cluster size", value: "313,801 txs, 599,707+ BTC lifetime funded volume" },
        { label: "Latest follow-up", value: "2026-04-27 02:55 UTC cluster hop confirmed" },
        { label: "Claim boundary", value: "Investigative lead only; not publicly labeled to a named exchange." }
      ],
      evidenceRefs: ["btc-service-cluster", "btc-service-touch-tx", "btc-service-touch-tx-2", "btc-service-touch-tx-3", "btc-service-touch-tx-4", "btc-service-touch-tx-5", "btc-service-touch-tx-6", "btc-service-touch-tx-7", "btc-service-touch-tx-8", "btc-service-touch-tx-9"]
    },
    {
      id: "ciotx-tail",
      name: "0xA467 CIOTX tail",
      status: "constrained",
      classification: "confirmed-stolen-path",
      summary: "Ethereum-side CIOTX branch remains bounded, with 76,448,785 CIOTX still visible on 0xA467.",
      scores: { recovery: 60, ownerId: 88, actionability: 55, confidence: 95 },
      nextAction: "Track outbound CIOTX transfers and cross-check against IoTeX chain and exchange controls.",
      details: [
        { label: "Address", value: "0xA467a6c7cA8e812E997bfe50Ce4E7991aAd00A88" },
        { label: "Balance", value: "76,448,785 CIOTX" },
        { label: "Source", value: "Blockscout token balances and transfer history" },
        { label: "Claim boundary", value: "Confirmed visible tail; recovery depends on controls beyond tracing." }
      ],
      evidenceRefs: ["ciotx-a467"]
    },
    {
      id: "ciotx-venue-branch",
      name: "Binance / partner branch",
      status: "offchain",
      classification: "confirmed-stolen-path",
      summary: "IoTeX reported 52.4M CIOTX deposited to Binance and trading partners including Easybit and ChangeNow.",
      scores: { recovery: 55, ownerId: 80, actionability: 35, confidence: 82 },
      nextAction: "Ask IoTeX whether this branch is already under venue preservation or settlement process.",
      details: [
        { label: "Amount", value: "52.4M CIOTX reported by IoTeX" },
        { label: "Venues", value: "Binance, Easybit, ChangeNow mentioned in public recovery picture" },
        { label: "Status", value: "Off-chain cooperation needed" },
        { label: "Claim boundary", value: "Confirmed from IoTeX public reporting; external researcher cannot verify venue records." }
      ],
      evidenceRefs: ["iotex-month-review", "iotex-update-2"]
    }
  ],
  timeline: [
    {
      date: "2026-02-21",
      title: "Bridge incident",
      text: "Validator owner compromise and malicious upgrade leads to reserve drain plus CIOTX mint branch.",
      status: "unknown",
      classification: "confirmed-stolen-path"
    },
    {
      date: "2026-02-21",
      title: "ETH to THORChain",
      text: "0x6487... executes 17 direct THORChain router deposits totaling 1,464.4077 ETH.",
      status: "tracing",
      classification: "confirmed-stolen-path"
    },
    {
      date: "2026-03-06",
      title: "IoTeX update",
      text: "IoTeX publishes BTC landing set and says 66.78 BTC remains unspent at that time.",
      status: "live",
      classification: "confirmed-stolen-path"
    },
    {
      date: "2026-04-21",
      title: "BTC tail recheck",
      text: "Four published BTC addresses now hold 22.863073 BTC; the rest has partially peeled onward.",
      status: "tracing",
      classification: "confirmed-stolen-path"
    },
    {
      date: "2026-04-22",
      title: "Peel leads found",
      text: "Second-hop live address 1EGcRh... and service-like cluster touch bc1q7t4v... are identified.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-24",
      title: "No tail movement",
      text: "Original BTC tail and 1EGcRh... remain unmoved; bc1q7t4v... remains highly active.",
      status: "live",
      classification: "confirmed-stolen-path"
    },
    {
      date: "2026-04-25",
      title: "Service-like lead spent",
      text: "bc1q7t4v... showed a confirmed on-chain spend on 2026-04-25, so the branch is confirmed as active rather than stagnant.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-26",
      title: "Service-like lead activity renewed",
      text: "bc1q7t4v... had confirmed on-chain spend activity on 2026-04-26, latest at 17:49 UTC, again indicating the linked branch is still actively managed and no new venue exit is yet confirmed.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-26",
      title: "Service-like lead moved again",
      text: "bc1q7t4v... had another confirmed on-chain hop at 23:39 UTC, keeping the same 0.75 BTC branch in active service-like movement without a confirmed venue exit.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity continues",
      text: "bc1q7t4v... showed a confirmed on-chain hop at 02:55 UTC, consistent with ongoing internal cluster churn and no confirmed venue exit of the tracked stolen tail.",
      status: "service",
      classification: "investigative-lead"
    }
  ],
  notes: [
    {
      author: "Analyst",
      date: "2026-04-24",
      text: "The strongest independent earning angle is owner-attribution for bc1q7t4v..., not another generic report about the exploit."
    },
    {
      author: "User",
      date: "2026-04-24",
      text: "Manual analysis is triggered from console/chat. Dashboard should be updated by committing new case data after each review."
    },
    {
      author: "Analyst",
      date: "2026-04-24",
      text: "Do not overclaim bc1q7t4v... as a named exchange. Current public claim is only large active service-like cluster."
    }
  ],
  sources: [
    { id: "iotex-incident-update", label: "IoTeX security incident update", url: "https://blog.iotex.io/blog/security-incident-update-iotube-bridge-exploit-and-recovery-roadmap/" },
    { id: "iotex-month-review", label: "IoTeX full month review", url: "https://blog.iotex.io/blog/how-iotex-responded-to-the-iotube-bridge-incident-a-full-month-in-review/" },
    { id: "iotex-update-2", label: "IoTeX update No.2", url: "https://blog.iotex.io/id/blog/iotube-bridge-incident-update-no-2-chain-resumed-recovery-underway/" },
    { id: "eth-reserve-eoa", label: "0x6487 reserve-drain EOA", url: "https://eth.blockscout.com/address/0x6487B5006904f3Db3C4a3654409AE92b87eD442f" },
    { id: "ciotx-a467", label: "0xA467 CIOTX branch", url: "https://eth.blockscout.com/address/0xA467a6c7cA8e812E997bfe50Ce4E7991aAd00A88" },
    { id: "btc-12v7", label: "BTC address 12V7...", url: "https://mempool.space/address/12V7jhcPnqnGbRFMasSW2CZVBd8qpvUgAK" },
    { id: "btc-16xus", label: "BTC address 16xus...", url: "https://mempool.space/address/16xusPKLMyqK68SkhfXDtic6AJPDi51tqh" },
    { id: "btc-1pn2", label: "BTC address 1PN2...", url: "https://mempool.space/address/1PN2BoHU4buDQWcrNHk9T9NBA2qX8oyYEc" },
    { id: "btc-135o", label: "BTC address 135o...", url: "https://mempool.space/address/135oSa2fobTxtHtm5dwTREDyRY2o1DG1Aw" },
    { id: "btc-1egcrh", label: "1EGcRh second-hop", url: "https://mempool.space/address/1EGcRhfss16hxHTZVcNcnBdpYWbcxFAgQ8" },
    { id: "btc-service-cluster", label: "bc1q7t4v service-like cluster", url: "https://mempool.space/address/bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz" },
    { id: "btc-service-touch-tx", label: "Service-like cluster touch tx", url: "https://mempool.space/tx/4a5978c12cbe84f6aee8b098f2848e6ede9eb05421f0a4dbad37a0af28e6a8f5" },
    { id: "btc-service-touch-tx-2", label: "Service-like cluster follow-up spend tx", url: "https://mempool.space/tx/9794790e42f3d5e28dca4eeb955c9f523ef2c16ca3c0c63634e75e883447c104" },
    { id: "btc-service-touch-tx-3", label: "Service-like cluster renewed spend tx", url: "https://mempool.space/tx/bcbcf62ea13e2aeedc74e41c9b4abd21703efb9ccda2b6b9586bf9b47c568886" },
    { id: "btc-service-touch-tx-4", label: "Service-like cluster fresh churn tx (11:42:23 UTC)", url: "https://mempool.space/tx/36c2cf7bb54242248b5a7252b940932a6e362cc969055c48bcaed299c2567453" },
    { id: "btc-service-touch-tx-5", label: "Service-like cluster fresh churn tx (11:46:23 UTC)", url: "https://mempool.space/tx/57176c1995c49d3e04570ac74cb470f1d7cfdaf2f04a646cf19d954cdf32f715" },
    { id: "btc-service-touch-tx-6", label: "Service-like cluster confirmed spend tx (14:56:00 UTC)", url: "https://mempool.space/tx/a96bc59bdce338183e6d52d19e20ed0db58e6c000ec0386a8efda8e754a0c467" },
    { id: "btc-service-touch-tx-7", label: "Service-like cluster confirmed spend tx (17:49:09 UTC)", url: "https://mempool.space/tx/d5d67a60e65ab73f9c0ca952a54a7f71383e52143448b9cffa826f159bd42b29" },
    { id: "btc-service-touch-tx-8", label: "Service-like cluster confirmed spend tx (23:39:09 UTC)", url: "https://mempool.space/tx/f8c66e7639c4eac22261c1b014cc9159e1ded62808dac0e2dbf3bf2a4c78717e" },
    { id: "btc-service-touch-tx-9", label: "Service-like cluster confirmed spend tx (02:55:23 UTC)", url: "https://mempool.space/tx/d16088b9a2ab1e59332a185c1df48074e93bc65a40747308a4309075d5dd024c" }
  ]
};
