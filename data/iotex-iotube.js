window.RECOVERY_CASE = {
  schemaVersion: "2.0",
  id: "iotex-iotube",
  case: {
    title: "IoTeX ioTube Recovery Dashboard",
    subtitle:
      "Product view of the ioTube bridge incident: what was stolen, where funds are now, what is confirmed, what is only a lead, and what to do next.",
    victim: "IoTeX ioTube bridge",
    incidentDate: "2026-02-21",
    lastReview: "2026-04-28",
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
      nextAction: "Service-like cluster remains actively managed, with confirmed follow-up spends on 2026-04-28 at 11:12:53 UTC, 11:35:51 UTC, and 11:50:07 UTC, and no confirmed venue exit of the tracked 0.75 BTC branch.",
      evidenceRefs: ["btc-service-cluster", "btc-service-touch-tx", "btc-service-touch-tx-2", "btc-service-touch-tx-3", "btc-service-touch-tx-4", "btc-service-touch-tx-5", "btc-service-touch-tx-6", "btc-service-touch-tx-7", "btc-service-touch-tx-8", "btc-service-touch-tx-9", "btc-service-touch-tx-10", "btc-service-touch-tx-11", "btc-service-touch-tx-12", "btc-service-touch-tx-13", "btc-service-touch-tx-14", "btc-service-touch-tx-15", "btc-service-touch-tx-16", "btc-service-touch-tx-17", "btc-service-touch-tx-18", "btc-service-touch-tx-19", "btc-service-touch-tx-20", "btc-service-touch-tx-21", "btc-service-touch-tx-22", "btc-service-touch-tx-23", "btc-service-touch-tx-24", "btc-service-touch-tx-25", "btc-service-touch-tx-26", "btc-service-touch-tx-27", "btc-service-touch-tx-28", "btc-service-touch-tx-29", "btc-service-touch-tx-30", "btc-service-touch-tx-31", "btc-service-touch-tx-32", "btc-service-touch-tx-33", "btc-service-touch-tx-34", "btc-service-touch-tx-35", "btc-service-touch-tx-36"]
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
        { label: "Last check", value: "2026-04-28 via mempool.space" },
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
      summary: "A 0.75 BTC branch from the IoTeX peel touched a huge active cluster, with confirmed activity continuing on 2026-04-28 at 11:12:53 UTC, 11:35:51 UTC, and 11:50:07 UTC, and prior mempool-candidate IDs 79ba5f... and 77c3bd... are now confirmed on-chain, with no confirmed venue exit yet.",
      scores: { recovery: 30, ownerId: 68, actionability: 76, confidence: 70 },
      nextAction: "Push this address to IoTeX or an analytics vendor and ask whether they can identify the operator.",
      details: [
        { label: "Address", value: "bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz" },
        { label: "Touch amount", value: "0.75 BTC from bc1qpn94... branch" },
        { label: "Cluster size", value: "313,801 txs, 599,707+ BTC lifetime funded volume" },
        { label: "Latest follow-up", value: "2026-04-28 confirmed service-like spend txs now include 31ca..., 11c828..., 0cdb..., 4e02..., and 5c5d... with confirmed activity at 11:12:53 UTC, 11:35:51 UTC, and 11:50:07 UTC; no confirmed venue exit on this branch yet" },
        { label: "Claim boundary", value: "Investigative lead only; not publicly labeled to a named exchange." }
      ],
      evidenceRefs: ["btc-service-cluster", "btc-service-touch-tx", "btc-service-touch-tx-2", "btc-service-touch-tx-3", "btc-service-touch-tx-4", "btc-service-touch-tx-5", "btc-service-touch-tx-6", "btc-service-touch-tx-7", "btc-service-touch-tx-8", "btc-service-touch-tx-9", "btc-service-touch-tx-10", "btc-service-touch-tx-11", "btc-service-touch-tx-12", "btc-service-touch-tx-13", "btc-service-touch-tx-14", "btc-service-touch-tx-15", "btc-service-touch-tx-16", "btc-service-touch-tx-17", "btc-service-touch-tx-18", "btc-service-touch-tx-19", "btc-service-touch-tx-20", "btc-service-touch-tx-21", "btc-service-touch-tx-22", "btc-service-touch-tx-23", "btc-service-touch-tx-24", "btc-service-touch-tx-25", "btc-service-touch-tx-26", "btc-service-touch-tx-27", "btc-service-touch-tx-28", "btc-service-touch-tx-29", "btc-service-touch-tx-30", "btc-service-touch-tx-31", "btc-service-touch-tx-32", "btc-service-touch-tx-33", "btc-service-touch-tx-34", "btc-service-touch-tx-35", "btc-service-touch-tx-36"]
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
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity persists",
      text: "bc1q7t4v... showed confirmed cluster churn at 05:28 UTC, still without a confirmed venue exit or off-chain handoff of the tracked branch.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity continues",
      text: "bc1q7t4v... showed confirmed on-chain hops at 08:54 UTC and 09:01 UTC, still without a confirmed venue exit or off-chain handoff of the tracked 0.75 BTC branch.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity continues",
      text: "bc1q7t4v... showed confirmed on-chain hops at 11:40:55 UTC and 11:52:30 UTC, still without a confirmed venue exit or off-chain handoff of the tracked 0.75 BTC branch.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity persists",
      text: "bc1q7t4v... showed confirmed on-chain hops at 14:39:17 UTC and 14:51:48 UTC, still without a confirmed venue exit or off-chain handoff of the tracked 0.75 BTC branch.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-27",
      title: "Service-like lead activity confirmed",
      text: "A tracked mempool follow-up from bc1q7t4v... (77c3bd...) is now confirmed, and additional confirmed service-like hops were observed later on 2026-04-27 at 20:33:16 UTC, 20:41:22 UTC, and 20:53:12 UTC; no venue exit or off-chain handoff has been confirmed.",
      status: "service",
      classification: "investigative-lead"
    },
    {
      date: "2026-04-28",
      title: "Service-like lead remains active",
      text: "Confirmed service-like txs were observed on 2026-04-28 at 11:12:53 UTC, 11:35:51 UTC, and 11:50:07 UTC, and earlier in the day at 05:51:17 UTC, 05:57:54 UTC, 07:42:21 UTC, 07:50:21 UTC, 08:02:00 UTC, 08:21:15 UTC, and 08:27:18 UTC; still no confirmed venue exit or off-chain handoff of the 0.75 BTC stolen-tail touch.",
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
    { id: "btc-service-touch-tx-9", label: "Service-like cluster confirmed spend tx (02:55:23 UTC)", url: "https://mempool.space/tx/d16088b9a2ab1e59332a185c1df48074e93bc65a40747308a4309075d5dd024c" },
    { id: "btc-service-touch-tx-10", label: "Service-like cluster confirmed spend tx (05:28:23 UTC)", url: "https://mempool.space/tx/b05f04b977d26af1dcdbecb3ffea0b39d877fe26f58af688830901b0366fc1cb" },
    { id: "btc-service-touch-tx-11", label: "Service-like cluster follow-up spend tx (08:54:23 UTC)", url: "https://mempool.space/tx/e5a00cd7454b403accfc2d594d9e6fe4b88f688fabe0c8e9aaa5a1c547f6bf3b" },
    { id: "btc-service-touch-tx-12", label: "Service-like cluster follow-up spend tx (09:01:06 UTC)", url: "https://mempool.space/tx/cb096c0df04797dcd403813b458f855682bd54b4dc4b7005f923dbe9cce62e36" },
    { id: "btc-service-touch-tx-13", label: "Service-like cluster confirmed spend tx (11:40:55 UTC)", url: "https://mempool.space/tx/b5255452ac3d2ea1007a9668bc153360b542521ade5aa7ffabff06539fe5a750" },
    { id: "btc-service-touch-tx-14", label: "Service-like cluster confirmed spend tx (11:52:30 UTC)", url: "https://mempool.space/tx/069538fde0d3455014319860034dee95c838877615bf428c86004d86d9f91716" },
    { id: "btc-service-touch-tx-15", label: "Service-like cluster confirmed spend tx (14:39:17 UTC)", url: "https://mempool.space/tx/55c8db39be66794c56d1544419fabddbf82c9b49f15f06bd52116c00170333b2" },
    { id: "btc-service-touch-tx-16", label: "Service-like cluster confirmed spend tx (14:51:48 UTC)", url: "https://mempool.space/tx/955c6ceb4865a79b5c27d56ca46c0e40f368acb45c6121f77e6443dc477da13b" },
    { id: "btc-service-touch-tx-17", label: "Service-like cluster unconfirmed mempool follow-up", url: "https://mempool.space/tx/77c3bd7ea453034b4492fcd96555a4001f63554bb326b892ad2fb0ac52c6c029" },
    { id: "btc-service-touch-tx-18", label: "Service-like cluster confirmed spend tx (20:33:16 UTC)", url: "https://mempool.space/tx/2212b208abb6582b831e6896626fddca8fac60375ef786ec3026c5a7fe980291" },
    { id: "btc-service-touch-tx-19", label: "Service-like cluster confirmed spend tx (20:41:22 UTC)", url: "https://mempool.space/tx/62c5867175340c5e461fc86782cb9be6594a68ad72c7ce73452de71224f8cfa7" },
    { id: "btc-service-touch-tx-20", label: "Service-like cluster confirmed spend tx (20:53:12 UTC)", url: "https://mempool.space/tx/fb4c6485d4704a88988fa51a1188438b4e7807913f840b4ea5642b9aeafc1fc3" },
    { id: "btc-service-touch-tx-21", label: "Service-like cluster confirmed spend tx (02:54:25 UTC)", url: "https://mempool.space/tx/72775b4f48c2d21ebef2f92e82729c6ef053f123db9e63445a9bdf957078ec1c" },
    { id: "btc-service-touch-tx-22", label: "Service-like cluster confirmed spend tx (02:54:25 UTC)", url: "https://mempool.space/tx/2e0c3e585757f46eca8c351cfb82271c0f5014bc2fe59769ae2555f8041b959d" },
    { id: "btc-service-touch-tx-23", label: "Service-like cluster confirmed spend tx (02:54:25 UTC)", url: "https://mempool.space/tx/f9dba93155c4757848daba2f06028d30e2a6af5e9cb24c57ae32387f5136cf62" },
    { id: "btc-service-touch-tx-24", label: "Service-like cluster confirmed mempool follow-up tx", url: "https://mempool.space/tx/79ba5f48c3ec839a846bda2ca7924f56e2d90785e26f749cf68c9e8b04e0541b" },
    { id: "btc-service-touch-tx-25", label: "Service-like cluster confirmed follow-up spend tx (05:57:54 UTC)", url: "https://mempool.space/tx/0ec87daffd63e9e5f764dbd693c190c937c7d13e8cb65ac2c39a628f197a3a84" },
    { id: "btc-service-touch-tx-26", label: "Service-like cluster confirmed follow-up spend tx (05:51:17 UTC)", url: "https://mempool.space/tx/edf913532bf646cb62b535536f68d60848bdae098692c40cc08eef3ccc7e42a4" },
    { id: "btc-service-touch-tx-27", label: "Service-like cluster confirmed spend tx (07:42:21 UTC)", url: "https://mempool.space/tx/3367e2905990ee264cd8148d1d7d2ceddb4cb7905d44f08b5e5e22f166e014c1" },
    { id: "btc-service-touch-tx-28", label: "Service-like cluster confirmed spend tx (07:50:21 UTC)", url: "https://mempool.space/tx/0efe816179efdf40de801cadf7d9771d863cf721b879164bf24ddaa7aa482477" },
    { id: "btc-service-touch-tx-29", label: "Service-like cluster confirmed spend tx (08:02:00 UTC)", url: "https://mempool.space/tx/52b34c81461b63e7d99a4eb1e2c3de80c938dcc4bdcbae85b9ae436a92435476" },
    { id: "btc-service-touch-tx-30", label: "Service-like cluster confirmed spend tx (08:21:15 UTC)", url: "https://mempool.space/tx/874aeeefc064893925c624bd9cdef6555d54d4bf4e522788c2891aa1dbe67307" },
    { id: "btc-service-touch-tx-31", label: "Service-like cluster confirmed spend tx (08:27:18 UTC)", url: "https://mempool.space/tx/5cf6108342b7f5553079892b00b3cb8474feb47d873696450ee7d5f93dd30e5a" },
    { id: "btc-service-touch-tx-32", label: "Service-like cluster confirmed spend tx (11:12:53 UTC)", url: "https://mempool.space/tx/31ca94c8b394bb2c87a7275d4f7298548cf1baaec5efe12c08896c21590cbd0e" },
    { id: "btc-service-touch-tx-33", label: "Service-like cluster confirmed spend tx (11:12:53 UTC)", url: "https://mempool.space/tx/0cdb85484d0e743826d2b2727adb74179690e361ad14777123b89202bff10a3c" },
    { id: "btc-service-touch-tx-34", label: "Service-like cluster confirmed spend tx (11:35:51 UTC)", url: "https://mempool.space/tx/bbd9daf85e8ecb63e581c7ae942c8581c39c3d715739a6bc3b38d43301e73e16" },
    { id: "btc-service-touch-tx-35", label: "Service-like cluster confirmed spend tx (11:35:51 UTC)", url: "https://mempool.space/tx/11c8281835052796c093e71bcd0b852eda58d223397c28932ade71d601f15f39" },
    { id: "btc-service-touch-tx-36", label: "Service-like cluster confirmed spend tx (11:50:07 UTC)", url: "https://mempool.space/tx/5c5dff5c854417a1aec017fd2df64b600f5c5fe70ea007ad6366daff7cdbebf8" }
  ]
};
