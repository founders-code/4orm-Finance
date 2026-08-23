# -*- coding: utf-8 -*-
"""Privacy and Security.

Somebody arrives here straight after watching identity get verified, income
get supported and information get shared. They do not want a cookie policy.
They want to know what is held, who can see it, and what they control.

Every claim here is written so it survives being checked. Where something is
designed and not yet built, it says so.
"""
import kit
from pkit import hero, sec, softs, flow, note, cta, duty

ARROW = "&#8594;"


def build():
    S = []

    # --- what My 4orm actually is ---------------------------------------
    S.append(sec("My 4orm", "One record, and it is yours to look at.",
        '<div class="my4">' +
        "".join('<div class="m4"><span class="m4k">%s</span><p>%s</p></div>' % (k, v) for k, v in [
            ("Information", "What you told us, and what a document supports."),
            ("Documents", "The files you added, unaltered, with when you added them."),
            ("Verification", "The result of a check, and the evidence of it. Not the raw "
                             "identity document."),
            ("Permissions", "What you allowed, to whom, and when."),
            ("Sharing history", "Every time something moved, and what moved."),
            ("Evidence", "What happened, in order, with where each piece came from."),
        ]) + '</div>',
        p="My 4orm is your record of an important financial decision: what you provided, what has "
          "been verified, who you are connected with, and what you were asked to share."))

    # --- who sees what --------------------------------------------------
    S.append(sec("Who sees what", "Three views of the same relationship.",
        '<div class="dgrid">' +
        duty("You", "Everything in your own record, including what you have shared and with whom.") +
        duty("The professional you connect",
             "Only the items you authorised, and only from the moment you authorised them.") +
        duty("The firm they work for",
             "The relationship events its own supervision requires, rather than the contents of "
             "your private preparation.") +
        '</div>' +
        note("b", "<b>Nothing moves on its own.</b> Where permission is required, you are shown "
                  "what is being requested, by whom, and why, before anything is sent."),
        alt=True,
        p="The same relationship looks different depending on where you stand in it. That is "
          "deliberate."))

    # --- identity -------------------------------------------------------
    S.append(sec("Identity", "The result is kept. The document is not ours to keep.",
        flow([
            ("You verify once",
             "Identity checking runs through specialist verification infrastructure built for "
             "exactly that job."),
            ("4orm records the result",
             "That the check happened, when, and what it concluded, together with the evidence of "
             "it. Not a copy of your licence sitting in a general-purpose store."),
            ("You stop repeating yourself",
             "The next professional sees that your identity is verified rather than asking you to "
             "prove it again from the beginning."),
        ], two=False)))

    # --- sharing --------------------------------------------------------
    S.append(sec("Sharing", "Six things requested. Four things sent.",
        '<div class="shdemo">'
        '<div class="shcol"><span class="shk">Requested</span>'
          '<span class="shi on">Identity verification</span>'
          '<span class="shi on">Income</span>'
          '<span class="shi on">Employment</span>'
          '<span class="shi off">Full account history</span>'
          '<span class="shi on">What you are trying to do</span>'
          '<span class="shi off">Everything in your vault</span>'
        '</div>'
        '<div class="sharrow" aria-hidden="true">&#8594;</div>'
        '<div class="shcol"><span class="shk">Sent</span>'
          '<span class="shi on">Identity verification</span>'
          '<span class="shi on">Income</span>'
          '<span class="shi on">Employment</span>'
          '<span class="shi on">What you are trying to do</span>'
        '</div></div>' +
        note("w", "<b>The honest limit.</b> Once information reaches a regulated firm, that firm "
                  "may have its own legal duty to keep records of it. Withdrawing future access "
                  "does not undo what it is already required to hold. We would rather say that "
                  "than promise you something we cannot deliver."),
        p="You approve item by item. What you decline does not travel, and the decision is part of "
          "your record too.", alt=True))

    # --- security -------------------------------------------------------
    S.append(sec("Security", "What is in place, and what is still being built.",
        softs([
            ("In place", "Information encrypted in transit and at rest",
             "Standard transport security on every connection, and encryption of stored "
             "information.", "blue"),
            ("In place", "Access tied to a person, and to a purpose",
             "A person sees what their role in your relationship requires, and no more than "
             "that.", "blue"),
            ("In place", "Every access recorded",
             "Who looked, when, and at what. The log is part of the evidence rather than a "
             "separate system.", "ok"),
            ("Being built", "Independent security assessment",
             "Designed and scheduled, not yet completed. When it is done, this page will say so "
             "and name what was assessed.", "gold"),
        ], cols=2),
        p="Nothing on this page describes a control that is not either running today or explicitly "
          "marked as still being built."))

    # --- how the conversation is handled ---------------------------------
    S.append(sec("The conversation", "What happens to what you type.",
        '<div class="dgrid">' +
        duty("What it is for", "Explaining a decision to you in words you already use, and "
                               "helping you get ready for it.") +
        duty("What it is not", "It does not give regulated advice, and it does not make the "
                               "decision. That stays with the licensed professional.") +
        duty("Your questions", "Kept in your record as evidence that you asked, and that you were "
                               "answered, before you committed to anything.") +
        duty("Training", "Your private information is not used to train anybody else's "
                         "general-purpose systems.") +
        '</div>', alt=True))

    S.append(cta("Your information. Your decision.",
        "See what you have provided, what has been verified, who you are connected with, and what "
        "you are being asked to share. Where permission is required, 4orm asks first.",
        primary=("Experience 4orm", "/#personal"),
        secondary=("Website privacy policy", "/website-privacy")))

    body = hero("Privacy and security", "Your financial life",
                "is not ours.",
                "You can see what you have shared, know why it was asked for, understand where it "
                "came from, correct what is wrong, and control optional permissions where they "
                "are optional.") + "".join(S)
    yield kit.write("privacy", "/privacy", "Your financial life is not ours.",
                    "What My 4orm holds, who can see it, how identity and sharing work, and what "
                    "security is in place today.", body)
