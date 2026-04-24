window.RECOVERY_CASE = {
  id: "iotex-iotube",
  title: "IoTeX ioTube Recovery State",
  subtitle:
    "Manual recovery board for the ioTube bridge incident: visible BTC tail, spent BTC peel map, CIOTX residue, service-like cluster lead, and next actions.",
  review: {
    last: "2026-04-24",
    next: "2026-04-26"
  },
  metrics: [
    {
      label: "Reserve drain",
      value: "~$4.4M",
      caption: "Public reserve-drain estimate before CIOTX mint branch.",
      status: "unknown"
    },
    {
      label: "BTC still visible",
      value: "22.863073 BTC",
      caption: "On four IoTeX-published BTC landing addresses.",
      status: "live"
    },
    {
      label: "Second-hop live",
      value: "4.79142054 BTC",
      caption: "On 1EGcRh... with a mixed-use caveat.",
      status: "tracing"
    },
    {
      label: "CIOTX tail",
      value: "76,448,785",
      caption: "Still visible on 0xA467... on Ethereum.",
      status: "constrained"
    },
    {
      label: "Reward priority",
      value: "74/100",
      caption: "Current manual reward-probability score.",
      color: "#28302c"
    }
  ],
  flow: {
    nodes: [
      { name: "Reserve drain ETH", label: "Reserve drain\nETH", status: "unknown", x: 40, y: 130, size: 64, mobileX: 40, mobileY: 55, mobileLabelPosition: "right" },
      { name: "THORChain router", label: "THORChain\nrouter", status: "tracing", x: 220, y: 130, size: 58, mobileX: 40, mobileY: 125, mobileLabelPosition: "right" },
      { name: "BTC landing set", label: "4 BTC\nlanding addrs", status: "live", x: 400, y: 130, size: 68, mobileX: 40, mobileY: 205, mobileLabelPosition: "right" },
      { name: "Original BTC tail", label: "22.863073 BTC\nstill visible", status: "live", x: 620, y: 54, size: 62, mobileX: 238, mobileY: 162, mobileLabelPosition: "left" },
      { name: "Spent BTC peel", label: "spent BTC\npeel map", status: "tracing", x: 620, y: 196, size: 60, mobileX: 238, mobileY: 252, mobileLabelPosition: "left" },
      { name: "1EGcRh live second-hop", label: "1EGcRh\nlive second-hop", status: "tracing", x: 820, y: 112, size: 54, mobileX: 238, mobileY: 342, mobileLabelPosition: "left" },
      { name: "bc1q7t4v service-like hit", label: "bc1q7t4v\nservice-like hit", status: "service", x: 1010, y: 196, size: 58, mobileX: 238, mobileY: 438, mobileLabelPosition: "left" },
      { name: "Other spent BTC branches", label: "other spent\nbranches", status: "unknown", x: 820, y: 278, size: 52, mobileX: 40, mobileY: 342, mobileLabelPosition: "right" },
      { name: "CIOTX mint branch", label: "CIOTX\nmint branch", status: "constrained", x: 220, y: 330, size: 58, mobileX: 40, mobileY: 540, mobileLabelPosition: "right" },
      { name: "0xA467 visible CIOTX", label: "0xA467\n76.4M CIOTX", status: "constrained", x: 500, y: 330, size: 58, mobileX: 238, mobileY: 540, mobileLabelPosition: "left" },
      { name: "Binance / partners", label: "Binance /\npartners", status: "offchain", x: 760, y: 330, size: 54, mobileX: 238, mobileY: 625, mobileLabelPosition: "left" }
    ],
    links: [
      { source: "Reserve drain ETH", target: "THORChain router", value: 66.78, width: 12, status: "tracing", label: "1,464 ETH" },
      { source: "THORChain router", target: "BTC landing set", value: 66.78, width: 12, status: "tracing", label: "~66.78 BTC" },
      { source: "BTC landing set", target: "Original BTC tail", value: 22.863073, width: 8, status: "live", label: "22.86 BTC live" },
      { source: "BTC landing set", target: "Spent BTC peel", value: 43.916927, width: 10, status: "tracing", label: "43.92 BTC spent" },
      { source: "Spent BTC peel", target: "1EGcRh live second-hop", value: 2.879058, width: 5, status: "tracing", label: "2.879 BTC linked" },
      { source: "Spent BTC peel", target: "bc1q7t4v service-like hit", value: 0.75, width: 4, status: "service", label: "0.75 BTC hit" },
      { source: "Spent BTC peel", target: "Other spent BTC branches", value: 40.287869, width: 8, status: "unknown", label: "other branches" },
      { source: "CIOTX mint branch", target: "0xA467 visible CIOTX", value: 76.448785, width: 8, status: "constrained", label: "76.4M CIOTX" },
      { source: "CIOTX mint branch", target: "Binance / partners", value: 52.4, width: 7, status: "offchain", label: "52.4M CIOTX" }
    ]
  },
  network: {
    categories: ["Victim", "Wallet", "Service", "Asset", "Source"],
    nodes: [
      { name: "IoTeX ioTube", label: "IoTeX", category: 0, size: 54, status: "live", tooltip: "Victim protocol" },
      { name: "0x6487 reserve drain", label: "0x6487", category: 1, size: 38, status: "tracing", tooltip: "Ethereum reserve-drain EOA" },
      { name: "THORChain router", category: 2, size: 42, status: "tracing", tooltip: "17 direct depositWithExpiry transactions" },
      { name: "BTC landing addresses", label: "4 BTC landings", category: 1, size: 48, status: "live", tooltip: "22.863073 BTC remains" },
      { name: "1EGcRh", category: 1, size: 34, status: "tracing", tooltip: "4.79142054 BTC balance; mixed-use caveat" },
      { name: "bc1q7t4v", category: 2, size: 46, status: "service", tooltip: "313,699 txs; 599,484+ BTC lifetime funded volume" },
      { name: "0xA467 CIOTX", label: "0xA467", category: 1, size: 40, status: "constrained", tooltip: "76,448,785 CIOTX visible" },
      { name: "Binance / partners", category: 2, size: 34, status: "offchain", tooltip: "52.4M CIOTX branch per IoTeX update" },
      { name: "IoTeX updates", category: 4, size: 24, status: "frozen", tooltip: "Public incident reports" }
    ],
    links: [
      { source: "IoTeX ioTube", target: "0x6487 reserve drain", value: "drain" },
      { source: "0x6487 reserve drain", target: "THORChain router", value: "1,464 ETH" },
      { source: "THORChain router", target: "BTC landing addresses", value: "~66.78 BTC" },
      { source: "BTC landing addresses", target: "1EGcRh", value: "2.879 BTC direct input" },
      { source: "BTC landing addresses", target: "bc1q7t4v", value: "0.75 BTC service-like hit" },
      { source: "IoTeX ioTube", target: "0xA467 CIOTX", value: "CIOTX branch" },
      { source: "0xA467 CIOTX", target: "Binance / partners", value: "52.4M reported" },
      { source: "IoTeX updates", target: "BTC landing addresses", value: "published addresses" },
      { source: "IoTeX updates", target: "Binance / partners", value: "public recovery update" }
    ]
  },
  branches: [
    {
      id: "btc-original-tail",
      name: "Original BTC tail",
      status: "live",
      summary: "Four IoTeX-published BTC addresses still hold 22.863073 BTC with no mempool movement at the last review.",
      scores: { recovery: 58, ownerId: 48, actionability: 72, confidence: 94 },
      nextAction: "Keep this as the top watchlist. Any new spend becomes an immediate venue-identification event.",
      details: [
        { label: "Amount", value: "22.863073 BTC" },
        { label: "Addresses", value: "12V7..., 16xus..., 1PN2..., 135o..." },
        { label: "Last check", value: "2026-04-24 via mempool.space" },
        { label: "Caveat", value: "A large portion already peeled out after IoTeX's 2026-03-06 update." }
      ]
    },
    {
      id: "btc-second-hop",
      name: "1EGcRh live second-hop",
      status: "tracing",
      summary: "Second-hop address with a 4.79142054 BTC balance; 2.879058 BTC is directly tied to the 12V7 peel branch.",
      scores: { recovery: 45, ownerId: 50, actionability: 64, confidence: 72 },
      nextAction: "Watch for movement and separate the IoTeX-linked input from the later mixed-use funding in any report.",
      details: [
        { label: "Address", value: "1EGcRhfss16hxHTZVcNcnBdpYWbcxFAgQ8" },
        { label: "Balance", value: "4.79142054 BTC" },
        { label: "Linked input", value: "2.879058 BTC from 12V7... peel branch" },
        { label: "Caveat", value: "Full balance is mixed-use; do not claim all of it is IoTeX proceeds." }
      ]
    },
    {
      id: "service-cluster",
      name: "bc1q7t4v service-like cluster",
      status: "service",
      summary: "A 0.75 BTC branch from the IoTeX peel touched a huge active cluster. It is the best owner-attribution lead.",
      scores: { recovery: 30, ownerId: 68, actionability: 76, confidence: 70 },
      nextAction: "Push this address to IoTeX or an analytics vendor and ask whether they can identify the operator.",
      details: [
        { label: "Address", value: "bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz" },
        { label: "Touch amount", value: "0.75 BTC from bc1qpn94... branch" },
        { label: "Cluster size", value: "313,699 txs, 599,484+ BTC lifetime funded volume" },
        { label: "Caveat", value: "Not publicly labeled to a named exchange yet." }
      ]
    },
    {
      id: "ciotx-tail",
      name: "0xA467 CIOTX tail",
      status: "constrained",
      summary: "Ethereum-side CIOTX branch remains bounded, with 76,448,785 CIOTX still visible on 0xA467.",
      scores: { recovery: 60, ownerId: 88, actionability: 55, confidence: 95 },
      nextAction: "Track outbound CIOTX transfers and cross-check against IoTeX chain/exchange controls.",
      details: [
        { label: "Address", value: "0xA467a6c7cA8e812E997bfe50Ce4E7991aAd00A88" },
        { label: "Balance", value: "76,448,785 CIOTX" },
        { label: "Source", value: "Blockscout token balances and transfer history" },
        { label: "Caveat", value: "Recovery depends on IoTeX/exchange controls, not public tracing alone." }
      ]
    },
    {
      id: "exchange-branch",
      name: "Binance / partner branch",
      status: "offchain",
      summary: "IoTeX reported 52.4M CIOTX deposited to Binance and trading partners including Easybit and ChangeNow.",
      scores: { recovery: 55, ownerId: 80, actionability: 35, confidence: 82 },
      nextAction: "Ask IoTeX whether this branch is already under venue preservation or settlement process.",
      details: [
        { label: "Amount", value: "52.4M CIOTX reported by IoTeX" },
        { label: "Venues", value: "Binance, Easybit, ChangeNow mentioned in public recovery picture" },
        { label: "Status", value: "Off-chain cooperation needed" },
        { label: "Caveat", value: "External researcher cannot force KYC or freeze records without authority." }
      ]
    }
  ],
  timeline: [
    {
      date: "2026-02-21",
      title: "Bridge incident",
      text: "Validator owner compromise and malicious upgrade leads to reserve drain plus CIOTX mint branch.",
      status: "unknown"
    },
    {
      date: "2026-02-21",
      title: "ETH to THORChain",
      text: "0x6487... executes 17 direct THORChain router deposits totaling 1,464.4077 ETH.",
      status: "tracing"
    },
    {
      date: "2026-03-06",
      title: "IoTeX update",
      text: "IoTeX publishes BTC landing set and says 66.78 BTC remains unspent at that time.",
      status: "live"
    },
    {
      date: "2026-04-21",
      title: "BTC tail recheck",
      text: "Four published BTC addresses now hold 22.863073 BTC; the rest has partially peeled onward.",
      status: "tracing"
    },
    {
      date: "2026-04-22",
      title: "Peel map found",
      text: "Second-hop live address 1EGcRh... and service-like cluster touch bc1q7t4v... are identified.",
      status: "service"
    },
    {
      date: "2026-04-24",
      title: "No tail movement",
      text: "Original BTC tail and 1EGcRh... remain unmoved; bc1q7t4v... remains highly active.",
      status: "live"
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
    { label: "IoTeX security incident update", url: "https://blog.iotex.io/blog/security-incident-update-iotube-bridge-exploit-and-recovery-roadmap/" },
    { label: "IoTeX full month review", url: "https://blog.iotex.io/blog/how-iotex-responded-to-the-iotube-bridge-incident-a-full-month-in-review/" },
    { label: "IoTeX update No.2", url: "https://blog.iotex.io/id/blog/iotube-bridge-incident-update-no-2-chain-resumed-recovery-underway/" },
    { label: "0x6487 reserve-drain EOA", url: "https://eth.blockscout.com/address/0x6487B5006904f3Db3C4a3654409AE92b87eD442f" },
    { label: "0xA467 CIOTX branch", url: "https://eth.blockscout.com/address/0xA467a6c7cA8e812E997bfe50Ce4E7991aAd00A88" },
    { label: "BTC address 12V7...", url: "https://mempool.space/address/12V7jhcPnqnGbRFMasSW2CZVBd8qpvUgAK" },
    { label: "BTC address 16xus...", url: "https://mempool.space/address/16xusPKLMyqK68SkhfXDtic6AJPDi51tqh" },
    { label: "BTC address 1PN2...", url: "https://mempool.space/address/1PN2BoHU4buDQWcrNHk9T9NBA2qX8oyYEc" },
    { label: "BTC address 135o...", url: "https://mempool.space/address/135oSa2fobTxtHtm5dwTREDyRY2o1DG1Aw" },
    { label: "1EGcRh second-hop", url: "https://mempool.space/address/1EGcRhfss16hxHTZVcNcnBdpYWbcxFAgQ8" },
    { label: "bc1q7t4v service-like cluster", url: "https://mempool.space/address/bc1q7t4vyehjsexdme84qhdgd4dawcn54djh0m78fz" },
    { label: "Service-like cluster touch tx", url: "https://mempool.space/tx/4a5978c12cbe84f6aee8b098f2848e6ede9eb05421f0a4dbad37a0af28e6a8f5" }
  ]
};
