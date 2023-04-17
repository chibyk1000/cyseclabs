export const faqs = [
  {
    id: 1,
    question: "Introduction",
    text1:
      "Cybersecurity is a constant race between white hat hackers and black hat hackers. As threats in the cyber-world evolve, so does the need for more specialized services that allow companies to prepare for real attacks the best they can.",

    text2:
      "While conventional security engagements like vulnerability assessments and penetration tests could provide an excellent overview of the technical security posture of a company, they might overlook some other aspects that a real attacker can exploit. In that sense, we could say that conventional penetration tests are good at showing vulnerabilities so that you can take proactive measures but might not teach you how to respond to an actual ongoing attack by a motivated adversary.",
    text3:
      "Before beginning this room, familiarity with general hacking techniques is required. Although not strictly necessary, completing the Jr. Penetration Tester Learning Path is recommended.",
    head1: "Room Objectives",
    head2: "Room Prequisite",
    list1: "Learn About The Basics Of Red Team Engagements",
    list2:
      "Identify The Main Components And Stakeholders Involved In A Red Team Engagement",
    list3:
      "Understand The Main Differences Between Red Teaming And Other Types Of Cybersecurity Engagements",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
  {
    id: 2,
    question: "Vulnerability Assessment and Penetration Tests Limitations",
    text1: `This is the simplest form of security assessment, and its main objective is to identify as many vulnerabilities in as many systems in the network as possible. To this end, concessions may be made to meet this goal effectively. For example, the attacker's machine may be allowlisted on the available security solutions to avoid interfering with the vulnerability discovery process. 
    This makes sense since the objective is to look at every host on the network and evaluate its security posture individually while providing the most information to the company about where to focus its remediation efforts`,

    text2: `On top of scanning every single host for vulnerabilities, we often need to understand how they impact our network as a whole. Penetration tests add to vulnerability assessments by allowing the pentester to explore the impact of an attacker on the overall network by doing additional steps that include:

      Attempt to exploit the vulnerabilities found on each system. This is important as sometimes a vulnerability might exist in a system, but compensatory controls in place effectively prevent its exploitation. It also allows us to test if we can use the detected vulnerabilities to compromise a given host.
     
      Conduct post-exploitation tasks on any compromised host, allowing us to find if we can extract any helpful information from them or if we might use them to pivot to other hosts that were not previously accessible from where we stand.`,
    text3:
      "Before beginning this room, familiarity with general hacking techniques is required. Although not strictly necessary, completing the Jr. Penetration Tester Learning Path is recommended.",
    head1: "Vulnerability Assessments",
    head2: "Penetration Tests",
    list1:
      "Penetration tests are LOUD: Usually, pentesters won't put much effort into trying to go undetected. Unlike real attackers, they don't mind being easy to detect, as they have been contracted to find as many vulnerabilities as they can in as many hosts as possible.",
    list2:
      "Non-technical attack vectors might be overlooked: Attacks based on social engineering or physical intrusions are usually not included in what is tested.",
    list3:
      "Relaxation of security mechanisms: While doing a regular penetration test, some security mechanisms might be temporarily disabled or relaxed for the pentesting team in favor of efficiency. Although this might sound counterintuitive, it is essential to remember that pentesters have limited time to check the network. Therefore, it is usually desired not to waste their time searching for exotic ways to bypass IDS/IPS, WAF, intrusion deception or other security measures, but rather focus on reviewing critical technological infrastructure for vulnerabilities.",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
  {
    id: 3,
    question: " Red Team Engagements",
    text1: `To keep up with the emerging threats, red team engagements were designed to shift the focus from regular penetration tests into a process that allows us to clearly see our defensive team's capabilities at detecting and responding to a real threat actor. They don't replace traditional penetration tests, but complement them by focusing on detection and response rather than prevention.

    Red teaming is a term borrowed from the military. In military exercises, a group would take the role of a red team to simulate attack techniques to test the reaction capabilities of a defending team, generally known as blue team, against known adversary strategies. Translated into the world of cybersecurity, red team engagements consist of emulating a real threat actor's Tactics, Techniques and Procedures (TTPs) so that we can measure how well our blue team responds to them and ultimately improve any security controls in place.
    
    Every red team engagement will start by defining clear goals, often referenced as crown jewels or flags, ranging from compromising a given critical host to stealing some sensitive information from the target. Usually, the blue team won't be informed of such exercises to avoid introducing any biases in their analysis. The red team will do everything they can to achieve the goals while remaining undetected and evading any existing security mechanisms like firewalls, antivirus, EDR, IPS and others. Notice how on a red team engagement, not all of the hosts on a network will be checked for vulnerabilities. A real attacker would only need to find a single path to its goal and is not interested in performing noisy scans that the blue team could detect.
    
    Taking the same network as before, on a red team engagement where the goal is to compromise the intranet server, we would plan for a way to reach our objective while interacting as little as possible with other hosts. Meanwhile, the blue team's capacity to detect and respond accordingly to the attack can be evaluated: `,

    text2: `It is important to note that the final objective of such exercises should never be for the red team to "beat" the blue team, but rather simulate enough TTPs for the blue team to learn to react to a real ongoing threat adequately. If needed, they could tweak or add security controls that help to improve their detection capabilities.`,
    text3:
      "Before beginning this room, familiarity with general hacking techniques is required. Although not strictly necessary, completing the Jr. Penetration Tester Learning Path is recommended.",
    head1:
      "Red team engagements also improve on regular penetration tests by considering several attack surfaces:",
    head2:
      "Depending on the resources available, the red team exercise can be run in several ways:",
    list1:
      "Technical Infrastructure: Like in a regular penetration test, a red team will try to uncover technical vulnerabilities, with a much higher emphasis on stealth and evasion.",
    list2:
      "Social Engineering: Targeting people through phishing campaigns, phone calls or social media to trick them into revealing information that should be private",
    list3:
      "Physical Intrusion: Using techniques like lockpicking, RFID cloning, exploiting weaknesses in electronic access control devices to access restricted areas of facilities.",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
  {
    id: 4,
    question: "Conclusion",
    text1: `A simplified overview of Red Team Engagements has been provided in this room. The main concepts, components and stakeholders have been introduced to gain a first understanding of such exercises. In the rooms that follow you will learn all of the planning behind a real engagement, as well as a lot of cool techniques a real attacker would use along the way, including how to use threat intelligence to your advantage, evade security mechanisms present in any modern host, perform lateral movement and try to avoid detection at all costs.`,

    text2: "",
    text3: "",
    head1: "",
    head2: "",
    list1: "",
    list2: "",
    list3: "",
    answer: "",
  },
];
