---
title: TryHackMe Security Analyst Level 1 (SAL1) and me
description: My experience upon failing the exam once and then passing it :)  and tips and suggestions for ones
date: 2025-05-26
tags:
  - certification
  - SAL1
  - TryHackMe
categories:
  - certification
---

Breaking into the cybersecurity field is an exciting and sometimes overwhelming path, especially when it comes to proving your skills through certifications. Recently, I had the opportunity to complete and pass the **Security Analyst Level 1 (SAL1)** certification by **TryHackMe**, and I’d like to share my experience, how I prepared, what to expect, and some tips for anyone planning to take it.

## What is the SAL1 Certification?

I hope you have already heard a lot about the certificate. So, lets keep it simple. TryHackMe's SAL1 certification is designed for aspiring security analysts or SOC professionals. It covers essential blue team topics such as threat detection, SIEM usage, incident response and real-world monitoring tasks. The certification focuses heavily on practical, hands-on skills - something I found particularly valuable compared to traditional, theory-heavy certifications.

The exam is scenario-based and time-bound. You're placed in a simulated SOC environment and tasked with investigating alerts, analyzing logs, and identifying potential threats. The exam also have a MCQ part to test your grasp on essentials. In the practical part of the exam alike an junior SOC analyst you will analyze alerts and make decisions to escalate them or not. 

## My Experience with the Exam

The exam was challenging but fair. I appreciated how it mimicked real SOC work - handling alerts, working with Splunk, documenting findings in a structured manner and making escalation decisions. The environment was stable and the instructions were clear. Time management was key; while none of the tasks were insurmountable, it’s easy to get caught up in a rabbit hole if you’re not careful.

The only **disappointment** I have with SAL1 is the MCQ part. It was totally non-proctored and unprotected. I mean if you wish you can literally look online and get most of the answers correct. I haven't even found many scenario based questions.

**Another observation I wanna mention is the amount of logs** in the Splunk dashboard. In a real life scenario there must be thousands of logs but in the simulation the count is too low. While an analyst have to handle huge amount of logs the queries requires to be complex to get most efficient output in least amount of time. Due to less amount of logs, some keyword search was enough most of the cases. 

## Preparation Strategy

I started my preparation by recapping the TryHackMe’s **SOC Level 1 learning path**, which is comprehensive and well-structured. It includes topics like:

- Cyber defense frameworks
- SIEM tools (Splunk, ELK)
- Packet analysis using Wireshark
- Host-based and network-based detection
- Incident handling procedures
- Some challenge rooms

I supplemented this with real-world SOC simulations and practicing log analysis with open datasets. One of the most beneficial things I did was build a small lab environment using virtual machines to simulate incidents and analyze artifacts. 

I have looked over different blogs and figured out the suggestions, possible exam patterns and how the insights on how to ace it. I have restructured my report writing and that helped me the most I believe. 

I wanna mention only depending on the SOC level 1 learning path of TryHackMe will be a really bad idea. As of my experience,  you don't need to prepare the whole learning path to crack the exam. 


## Tips for Future Candidates

1. **Don’t memorize—understand.** - SAL1 is practical-first. Understanding how logs behave, what alerts mean and how to use tools like Splunk is crucial.
2. **Master the platform tools.** - If you're unfamiliar with Splunk or ELK, invest time in learning query syntax and dashboards. Get familiar with Splunk as that's the tool you gonna work with.
3. **Simulate a SOC environment.** - Practicing triage, alert investigation, and incident reporting in a lab setting made a big difference for me. 
4. If you are practicing on TryHackMe I suggest to focus on the Splunk rooms and must do both free SOC simulation available on the platform. Get the reviews on your reports and keep improving. 
5. **Practice, Practice and Practice.** - Even if not in a simulated environment, Get Splunk on your device and use open datasets available. E.g. https://github.com/splunk/securitydatasets or https://github.com/splunk/attack_data . Focus on one attack at a time and prepare reports. Validate your reports with experts if possible. Remember the feedback loop is also the improvement loop. Can reach me out also.
6. **Keep notes.** - A personal knowledge base or playbook is incredibly helpful. You can use tools like Notion or Obsidian for that.
7. **Think like a defender.** - Consider the attacker’s TTPs and how they would reflect in logs - this mindset helped me piece together evidence faster. This gonna make a huge difference. Keep in mind that the logs are interconnected. If you deal them individually, gonna end up misclassifying events. Depending on circumstances what seems like an attack can be just an regular security scan by admin and what looks really legit can be attack too. You must need to be context aware to handle them. 
   
   Also remember, an incident have multiple phases starting from recon to exfiltration. Once you get the thread the rest will be easy. All logs will start making sense.
8.  **Figure out repeated false positives** - During the exam I have faced same false positive alerts coming again and again. If you can detect them it will save a lot of time. 
9. **Read** - You will be provided enough amount of data at the beginning of the scenario. Information about the company, the employees, their roles and responsibilities, device information, IP addresses, mail addresses, SOC analyst notes and more. 
   
   The most important part is escalation. You will be provided guidelines about what to escalate and what not to. Give it a real good read.
10. **Don't get alert fatigue** - I had to attempt second time because of my alert fatigue of first time. Trust me, you barely need the allotted 2 hours. So don't panic. 
   
   I loved the randomness of alerts appearance to the dashboard. It was realistic. There will be time you are waiting for alerts and suddenly alerts will flood in. It's very crucial how you gonna keep yourself calm and manage them one by one. I suggest to focus on the high and medium severity alerts first. Go with the incoming alert sequence if possible, it will make more sense if you look at the bigger picture and interconnect them. Sometime I tried to handle High risk alert and realized I missed the context in the medium severity alert. So go with the flow. 
   
   Again don't panic. Make some noodles, have your drink and give it the time needed. Stay calm.

### Maybe Illegal Tip
1. If you wish you can use tools like ChatGPT to help you write reports faster. It performs good. But be certain to check 2 things. The MITRE ATT&CK vector mapping is not always correct. And never ever make a decision based on the analysis of such tools.
2. The scenario get closed ASAP you handle all TP events. If you are unsure about a event. I suggest keep it on hold and handle other event. If the event is a FP and you are lucky maybe you can skip making some decisions.


## The report structure I used
Reporting matters a lot and I have used the below structure to ace it.

```
Alert description:  
Alert Id: 

5Ws  
Who:  
What:  
When:
Where: 
Why: 

Likely attacker intent:

Impact:  

MITRE ATT&CK:  

IOCs:  

Analysis behind the decision made:  

Recommendation:

Escalation decision:  
```

## Final Thoughts

Passing the SAL1 certification gave me a confidence boost and validated my hands-on abilities in blue teaming. It’s a certification I’d recommend to anyone interested in SOC roles or threat detection. It’s not just about passing a test - it’s about developing the mindset and discipline of a security analyst.

I’m looking forward to advancing further, perhaps tackling more red vs. blue hybrid certs next. For now, I’ll continue sharpening my skills and contributing to the community.

If you’re considering SAL1, go for it—and prepare to enjoy the ride. Feel free to reach me out anytime. 😊