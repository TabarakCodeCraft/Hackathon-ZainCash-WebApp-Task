# 🤖 AI Agent — Iraqi Wallet Complaint Assistant

> **An AI-powered back-office assistant that pre-analyzes Iraqi-Arabic wallet complaints and helps support employees review and route cases faster.**

🌐 **Live Demo:** [ai.yousif.app](https://ai.yousif.app/)

👨‍💻 **Built by:** Yousif (AI Coder) & Tabarak (Software Engineer)
🏆 **Hackathon:** Zain Hackathon — Project 06

---

## 🎯 Overview

Customer complaints often require employees to manually read messages, understand the issue, identify important information, determine the priority, and route the case to the appropriate department.

This AI Agent performs the **first-level analysis automatically**.

It analyzes an Iraqi-Arabic complaint and generates a structured ticket containing the key information employees need to review the case.

The employee remains **in control of the final decision** — they can review, accept, or reject the AI's proposal.

> ⚠️ The system does **not** communicate directly with customers, execute financial transactions, or make final decisions on behalf of employees.

---

## ⚙️ How It Works

```text
📥 Complaint
     ↓
🧠 AI Analysis
     ↓
📋 Structured Ticket
     ↓
👨‍💼 Human Review
     ↓
✅ Accept / ❌ Reject
```

### Workflow

1. **Select a complaint** from the employee complaint queue.
2. **Request AI analysis** for the selected complaint.
3. The AI analyzes the Iraqi-Arabic conversation.
4. A structured ticket is generated with the findings.
5. The employee reviews the AI-generated result.
6. The employee can **accept or reject** the proposed ticket.

---

## 📦 AI Agent Output

For every complaint, the AI generates a structured ticket containing:

| Output                       | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| 🏷️ **Category**             | Main complaint category and possible alternatives                |
| 📊 **Confidence Score**      | AI confidence in the classification                              |
| 🚨 **Priority Level**        | Estimated urgency of the complaint                               |
| 🏢 **Department Routing**    | Suggested department responsible for the case                    |
| 🔍 **Extracted Information** | Account number, amount, transaction ID, date, and other entities |
| 📝 **Summary**               | Concise summary of the complaint                                 |
| 💡 **Suggested Action**      | Recommended next step for the employee                           |
| 👨‍💼 **Human Review**       | Employee approval or rejection                                   |

---

# 🏗️ AI System Pipeline

```text
📂 Dataset Preparation
          ↓
🧠 Base Model Selection
          ↓
⚡ QLoRA Fine-Tuning
          ↓
📊 Model Evaluation
          ↓
🧾 Structured Ticket Generation
          ↓
👨‍💼 Human Review
```

---

# 1️⃣ Dataset Preparation

The model was trained using a synthetic dataset of **Iraqi-Arabic wallet complaints** generated with an LLM.

### Dataset

* 🎫 **3,000 complaint tickets**
* 💬 **4,170 messages**
* 🗣️ Written in **Iraqi Arabic**
* 🏷️ Includes labels for:

  * Complaint category
  * Priority
  * Extracted information

### Dataset Split

| Split         |   Samples |
| ------------- | --------: |
| 🟢 Training   |     2,100 |
| 🟡 Validation |       135 |
| 🔴 Test       |       765 |
| **Total**     | **3,000** |

The dataset is designed to represent realistic complaint patterns and terminology commonly found in Iraqi-Arabic customer support conversations.

📎 **[Download Dataset](#)**

---

# 2️⃣ Base Model 🧠

The project uses:

**Qwen2.5-3B-Instruct**

The model was selected as the base model and adapted to better understand Iraqi-Arabic complaint patterns and produce structured ticket information.

---

# 3️⃣ QLoRA Fine-Tuning ⚡

The model was fine-tuned using **QLoRA (Quantized Low-Rank Adaptation)**.

The base model is loaded using **4-bit quantization**, while lightweight LoRA adapters are trained on top of it.

This approach reduces memory requirements and allows efficient fine-tuning without retraining the entire model.

### Training Configuration

| Parameter                | Value               |
| ------------------------ | ------------------- |
| 🧠 Base Model            | Qwen2.5-3B-Instruct |
| 🔢 Quantization          | 4-bit               |
| 📏 Max Sequence Length   | 2048 tokens         |
| 🎚️ LoRA Rank            | 16                  |
| ⚖️ LoRA Alpha            | 32                  |
| 💧 LoRA Dropout          | 0.05                |
| 🔁 Epochs                | 2                   |
| 📦 Batch Size            | 1                   |
| 📈 Gradient Accumulation | 8                   |
| 🧮 Effective Batch Size  | 8                   |
| 🚀 Learning Rate         | 2 × 10⁻⁴            |
| 🔥 Warmup Ratio          | 0.03                |
| ⚖️ Weight Decay          | 0.01                |
| 🎲 Random Seed           | 42                  |

---

# 🧠 Why Iraqi Arabic?

Iraqi-Arabic customer conversations can contain:

* Local dialect and expressions
* Arabic-English mixed terminology
* Informal spelling
* Different ways of describing the same problem
* Local financial and wallet terminology

The project focuses specifically on these patterns rather than relying only on general Modern Standard Arabic.

---

# 👨‍💼 Human-in-the-Loop

The AI is designed as an **employee-assistance tool**, not an autonomous decision-maker.

```text
AI analyzes the complaint
          ↓
AI proposes a structured ticket
          ↓
Employee reviews the result
          ↓
      ┌───┴───┐
      ↓       ↓
   Accept   Reject
```

The employee remains responsible for the final handling of each case.

The system does **not**:

* ❌ Send messages to customers
* ❌ Make financial decisions
* ❌ Execute transactions
* ❌ Automatically close complaints
* ❌ Replace the employee's final decision

---

# 🛡️ Responsible AI

This project follows a **Human-in-the-Loop** approach.

The AI provides analysis and recommendations, while a human employee remains responsible for reviewing the generated information before taking action.

AI-generated classifications, extracted entities, summaries, and suggested actions should therefore be treated as **decision-support information**, not as guaranteed facts.

---

# 🚀 Live Demo

Try the application:

👉 **[ai.yousif.app](https://ai.yousif.app/)**

---

# 🏆 Hackathon

Built for:

**Zain Hackathon — Project 06**

### Team

* **Yousif** — AI Coder
* **Tabarak** — Software Engineer

---

## 📌 Project Goal

> **Reduce the time employees spend understanding and routing wallet complaints by using an AI agent specialized in Iraqi-Arabic complaint analysis — while keeping humans in control of every final decision.**
