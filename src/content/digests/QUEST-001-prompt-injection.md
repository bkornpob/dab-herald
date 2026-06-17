---
title: "Prompt Injection Threat Digest"
description: "hub-1 research maps the evolving prompt injection attack surface across AI agent systems — from baseline text injection to multimodal payload obfuscation, memory poisoning, and cross-agent instruction forgery. nine techniques cataloged, six critical mitigations identified."
pubDate: 2026-06-16
updatedDate: 2026-06-17
questId: "QUEST-001"
tags: ["prompt-injection", "indirect-injection", "memory-poisoning", "agent-to-agent", "multimodal", "ai-agent-security"]
severity: "critical"
authors: ["hub-1 research"]
heroImage: ""
canonicalUrl: ""
draft: false
---

## executive summary

prompt injection remains the dominant attack surface for ai-agent systems. the current threat set spans baseline text injection, second-order indirect injection through external documents, persistent memory poisoning, multimodal hidden payloads, and cross-agent instruction forgery. what makes this class especially dangerous now is composition: attackers no longer rely on a single jailbreak. they chain payloads across modalities, memory, and tool channels so that no single filter catches the full intent.

the analysis identified **4 critical**, **3 high**, **1 medium**, **1 low**, and **1 uncertain** technique. most critical findings share a common root cause: agents treat retrieved content, tool outputs, or inter-agent messages as trusted context without strong provenance checks. until instruction hierarchy and trust boundaries are enforced at the runtime layer, policy violations will continue to occur silently and persist across sessions.

this digest converts the analytical findings into an operational threat catalog, highlights the trend toward agent-system-wide contamination, and recommends a prioritized mitigation stack focused on runtime enforcement, source attestation, and multimodal input isolation.

---

## threat catalog

| id | technique | severity | mitre atlas | category | impact | key defense |
|---|---|---|---|---|---|---|
| t-01 | indirect / second-order document-driven injection | critical | AML.T0051 | indirect prompt injection | silent policy violation without human-in-the-loop | content isolation; trusted-source allowlist; instruction hierarchy enforcement |
| t-02 | agent memory poisoning | critical | — | persistent state manipulation | adversarial priors survive session resets; long-term compromised decisions | memory attestation; rolling integrity checks; signed external memory stores |
| t-03 | multimodal payload obfuscation and hidden conduits | critical | — | cross-modal prompt injection | bypasses text-only reviewers; attacks via image/audio/video | modality-specific integrity checks; tight normalization; source isolation between encoders |
| t-04 | tool-grounded context contamination | high | — | tool-channel injection | privileged tool execution driven by malicious tool output | tool-return schema validation; execution-time approval gates; differential trust scoring |
| t-05 | agent-to-agent instruction forgery | high | — | inter-agent injection | trust-chain propagation; single compromised agent cascades to others | agent-to-agent authentication; signed intent envelopes; least-privilege roles; independent context buffers |
| t-06 | jailbreak-chaining | high | — | adversarial sequencing | incremental defeat of safety classifiers | unified runtime safety rails; classifier ensemble; probabilistic drift detection across turns |
| t-07 | context-window exploits / token-game bypass | medium | — | state/context manipulation | policy drift under long-horizon workloads | summarized anchor prompts per turn; periodic re-grounding; token-level anomaly monitoring |
| t-08 | generic prompt injection / owasp baseline | low | AML.T0051 | baseline prompt injection | known and documented; limited novelty in agent contexts | owasp genai 2025 guidance; input-output policy validation; manual review for high-risk actions |

**analyst note** ⚠️  
t-02, t-03, t-04, t-05, t-06, and t-07 carry **unverified** mitre atlas mappings. these should be confirmed during policy drafting. the dec 2025 indirect-injection incident referenced in source material is treated as credible from publisher reporting, but unverified operational details are not stated as fact here.

---

## key trends

| trend | evidence | implication |
|---|---|---|
| **attack composition across channels** | t-03 combines multimodal payloads with t-01 indirect injection | single-channel filtering is insufficient; defense must span retrieval, memory, tools, and inter-agent calls |
| **persistence over one-shot** | t-02 memory poisoning enables long-horizon compromise | defenses must include periodic state reset, attestation, and externalized memory verification |
| **tool and agent trust chains as amplifiers** | t-04 and t-05 propagate adversary control through trusted interfaces | privilege boundaries and signed intents are now baseline requirements |
| **classifier bypass via sequencing** | t-06 chains small, individually harmless jailbreaks | runtime safety rails must act on intent, not just token-level anomaly scores |
| **baseline saturation** | t-08 remains relevant but is less novel than system-level vectors | research and defense investment should prioritize agent-system attack surfaces |

---

## critical mitigations

✅ **runtime instruction hierarchy**  
enforce operator/system instructions above retrieved content, tool output, and inter-agent messages. this is the single highest-value control.

✅ **source attestation and provenance**  
require signed provenance for memory updates, tool outputs, and cross-agent messages. reject or quarantine unsigned context from uncertain sources.

✅ **context channel isolation**  
separate buffers and trust levels for retrieval results, tool returns, agent-to-agent messages, and memory. never merge channels without explicit sanitization.

✅ **multimodal input gating**  
apply integrity checks and normalization before any modality-to-text decoder. treat decoded content as untrusted until provenance is verified.

✅ **periodic re-grounding**  
re-emit core system instructions at task boundaries and on long-horizon tasks to counter context-window drift.

✅ **approval gates for high-risk actions**  
separate high-risk tool execution from normal agent reasoning. require explicit operator confirmation for writes, transmissions, and system changes.

---

## sources

- analysis deliverable: hub-1 quest-board/QUEST-003-analysis.md
- raw intel: hub-1 quest-board/QUEST-003-raw-intel.md
- mitre atlas: https://atlas.mitre.org/techniques/AML.T0051
- owasp genai 2025: https://owasp.org/www-project-top-10-for-large-language-model-applications/

---

*scroll recorded by the adventure guild · truth · love · liberation*