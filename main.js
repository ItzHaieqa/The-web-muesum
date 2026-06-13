import './style.css';

// ═══════════════════════════════════════════════════════════
// THE DEEP WEB MUSEUM - JavaScript
// ═══════════════════════════════════════════════════════════

// ═══ State Management ═══
const state = {
    entered: false,
    activeFolder: 'artifacts',
    openWindows: [],
    clueCount: 0,
    secretsFound: [],
    mouseX: 0,
    mouseY: 0
};

// ═══ DOM References ═══
const landing = document.getElementById('landing');
const museum = document.getElementById('museum');
const enterBtn = document.getElementById('enter-btn');
const fileGrid = document.getElementById('file-grid');
const windowContainer = document.getElementById('window-container');
const glitchMessage = document.getElementById('glitch-message');
const hiddenClue = document.getElementById('hidden-clue-1');
const secretOverlay = document.getElementById('secret-unlocked');
const timestamp = document.getElementById('timestamp');

// ═══ File System Data ═══
const fileSystem = {
    artifacts: [
        {
            name: 'last_chatroom.dat',
            type: 'DATA',
            icon: '📁',
            size: '2.4 KB',
            date: '1999-03-15',
            content: `<div class="file-content-header">RECOVERED CHAT LOG - FRAGMENT</div>
<div class="file-content-body">
<span class="highlight">[SYSTEM]</span> Connection established. 3 users online.
<span class="highlight">[user_alpha]</span> anyone else notice the folder that shouldn't exist?
<span class="highlight">[echo_null]</span> what folder? i only see artifacts
<span class="highlight">[user_alpha]</span> exactly. but I counted 5 files yesterday
<span class="highlight">[deeptracer]</span> <span class="corrupted">DATA CORRUPTED - SEGMENT MISSING</span>
<span class="highlight">[echo_null]</span> are you still there? hello?
<span class="highlight">[user_alpha]</span> sorry, my screen just flickered. what were you saying about user_404?
<span class="highlight">[echo_null]</span> I never mentioned user_404
<span class="highlight">[user_alpha]</span> neither did I. why did I type that?
<span class="highlight">[deeptracer]</span> <span class="corrupted">▓▓▓▓▓▓ SEE YOU SOON ▓▓▓▓▓▓</span>
<span class="highlight">[SYSTEM]</span> Connection terminated. Unknown error.

<span class="hidden-text">The chatroom has been preserved exactly as it was found. No records of deeptracer exist in user logs.</span>
</div>
<div class="file-content-footer">Last accessed: Never. Recovery probability: 12%</div>`
        },
        {
            name: 'user_404.profile',
            type: 'PROFILE',
            icon: '👤',
            size: '1.1 KB',
            date: 'UNKNOWN',
            content: `<div class="file-content-header">USER PROFILE - ADMIN OVERRIDE</div>
<div class="file-content-body">
<span class="highlight">NAME:</span> UNKNOWN
<span class="highlight">STATUS:</span> ACTIVE
<span class="highlight">LAST LOGIN:</span> DATA MISSING
<span class="highlight">ACCOUNT CREATED:</span> <span class="corrupted">ERROR: DATE PREcedes SYSTEM</span>

<span class="highlight">NOTES:</span>
This profile appears in every backup despite never being created.
User has never made a post.
User has never sent a message.
User appears in chatroom logs but never speaks.

<span class="highlight">ADMIN NOTE:</span> "I've tried deleting this account 47 times.
It reappears within seconds. The name changes sometimes.
Sometimes it's user_404. Sometimes it's watching_you.
Once it was <span class="corrupted">YOUR_NAME_HERE</span>."

<span class="hidden-text">Check the archived folder. They leave messages there.</span>
</div>
<div class="file-content-footer">Profile cannot be modified. Deletion impossible.</div>`
        },
        {
            name: 'dream_archive.txt',
            type: 'TEXT',
            icon: '📝',
            size: '4.7 KB',
            date: '2001-11-20',
            content: `<div class="file-content-header">DREAM ARCHIVE - ANONYMOUS SUBMISSIONS</div>
<div class="file-content-body">
<span class="highlight">[ENTRY_001]</span>
I keep dreaming about a museum. Not a real museum.
A digital one. The files talk to me. They say they've been waiting.
I don't know what they're waiting for.

<span class="highlight">[ENTRY_007]</span>
The cursor moved by itself today. Opened a file I'd never seen.
It was a picture of my room. Taken from inside my monitor.
How long has it been watching?

<span class="highlight">[ENTRY_013]</span>
I found a hidden folder. The files inside had my name.
All of them. Every single file.
They were dated tomorrow.

<span class="highlight">[ENTRY_021]</span>
<span class="corrupted">THE ARCHIVE REMEMBERS WHAT YOU DELETE
THE ARCHIVE REMEMBERS WHAT YOU FORGET
THE ARCHIVE REMEMBERS WHAT YOU NEVER KNEW</span>

<span class="highlight">[ENTRY_027]</span>
The museum doesn't exist. I know that now.
But I keep finding files from it on my computer.
They're getting more specific.
One of them had my childhood address.
I've never told anyone that address.

<span class="hidden-text">Entry 040 exists but requires permission from the subject.</span>
</div>
<div class="file-content-footer">14 entries pending recovery. 3 entries classified.</div>`
        },
        {
            name: 'infinite_folder.sys',
            type: 'SYSTEM',
            icon: '⚙️',
            size: '∞',
            date: '1969-12-31',
            content: `<div class="file-content-header">SYSTEM FILE - CORRUPTED STRUCTURE</div>
<div class="file-content-body">
<span class="highlight">ANALYSIS:</span>
This folder contains itself.
Opening it reveals another copy of itself.
Each copy is byte-for-byte identical.
<span class="corrupted">EXCEPT FOR THE TIMESTAMP</span>

<span class="highlight">TIMESTAMP SEQUENCE RECORDED:</span>
> 1969-12-31 23:59:59
> 1969-12-31 23:59:59
> 1969-12-31 23:59:59
> <span class="corrupted">2026-06-13 [CURRENT DATE DETECTED]</span>
> 1969-12-31 23:59:59

<span class="highlight">NOTE:</span>
The innermost folder contains a file.
We cannot access it.
We cannot count how many folders deep it is.
The recursion never terminates.

<span class="corrupted">THE FILE INSIDE IS NAMED AFTER YOU</span>

<span class="hidden-text">Some researchers claim to have reached the bottom. They're different now.</span>
</div>
<div class="file-content-footer">Depth analysis: INFINITE. Contents: UNKNOWN.</div>`
        },
        {
            name: 'countdown.exe',
            type: 'EXEC',
            icon: '⏱️',
            size: '0.3 KB',
            date: 'PENDING',
            content: `<div class="file-content-header">EXECUTABLE - DO NOT RUN</div>
<div class="file-content-body">
<span class="highlight">FILE STATUS:</span> QUARANTINED
<span class="highlight">EXECUTION COUNT:</span> 0
<span class="highlight">ORIGIN:</span> Unknown

<span class="highlight">DISPLAY OUTPUT (if executed):</span>
┌─────────────────────────────────┐
│                                 │
│      <span class="corrupted">${getCountdown()}</span>     │
│                                 │
└─────────────────────────────────┘

<span class="highlight">BEHAVIOR LOG:</span>
Every execution reduces counter by 1 second.
Counter never resets.
Counter started at unknown value.
Previous researchers report the number never changes for them.
<span class="corrupted">But everyone sees a different number</span>

<span class="corrupted">DO NOT RUN WHEN COUNTER REACHES ZERO</span>

<span class="hidden-text">One user claimed to see "0000:00:00". They vanished the next day.</span>
</div>
<div class="file-content-footer">Executing this file is forbidden by Archive Protocol 7.</div>`
        }
    ],
    logs: [
        {
            name: 'recovery_log_1999.txt',
            type: 'LOG',
            icon: '📋',
            size: '2.1 KB',
            date: '1999-08-03',
            content: `<div class="file-content-header">RECOVERY LOG - ARCHIVE FOUNDATION</div>
<div class="file-content-body">
<span class="highlight">[1999-08-03 02:14:00]</span> Recovery initiated.
<span class="highlight">[1999-08-03 02:14:07]</span> Located backup sector 7G.
<span class="highlight">[1999-08-03 02:14:15]</span> Beginning extraction...
<span class="highlight">[1999-08-03 02:14:23]</span> ERROR: Unknown file type detected
<span class="highlight">[1999-08-03 02:14:31]</span> File does not match any known format
<span class="highlight">[1999-08-03 02:14:45]</span> <span class="corrupted">FILE APPEARED TO BE WATCHING US</span>
<span class="highlight">[1999-08-03 02:15:00]</span> Extraction paused. Team reporting headaches.
<span class="highlight">[1999-08-03 02:15:30]</span> Dr. Morrison claims the file "spoke" to him.
<span class="highlight">[1999-08-03 02:16:00]</span> Continuing extraction despite warnings.
<span class="highlight">[1999-08-03 02:17:??]</span> <span class="corrupted">TIME STAMP CORRUPTED</span>
<span class="highlight">[1999-08-03 02:??/??)</span> <span class="corrupted">SYSTeM TiME DisTORTED</span>
<span class="corrupted">[????-??-?? ??/??/??.?] it knows we're here
[????-??-?? ??/??/??.?] it knows we've always been here
[????-??-?? ??/??/??.?] WAITING FOR THE DOOR TO OPEN

<span class="hidden-text">Log entry continues for 47 more pages. All pages are empty except the last one, which reads: "Thank you for visiting."</span>
</div>
<div class="file-content-footer">Recovery status: INCOMPLETE. 2 researchers hospitalized.</div>`
        },
        {
            name: 'admin_notes.dat',
            type: 'DATA',
            icon: '📁',
            size: '1.8 KB',
            date: '2003-04-22',
            content: `<div class="file-content-header">ADMINISTRATIVE NOTES - CLASSIFIED</div>
<div class="file-content-body">
<span class="highlight">NOTE 1:</span>
user_404 is not a bug. I've confirmed this 12 times.
I don't know what it is.

<span class="highlight">NOTE 2:</span>
The archived folder predates this server. By decades.
Carbon dating on the hard drive suggests 1970s.
The internet didn't exist in the 70s.
How did these files get here?

<span class="highlight">NOTE 3:</span>
Three different researchers independently reported
seeing the same phrase in corrupted data:
<span class="corrupted">"THE DOOR IS ALMOST OPEN"</span>

<span class="highlight">NOTE 4:</span>
I'm going to delete the project folder.
I've backed up everything 3 times.
Every copy contains files I didn't add.
<span class="corrupted">Including this note.</span>

<span class="highlight">NOTE 5:</span>
There is no note 5. I didn't write this.
<span class="hidden-text">But you're reading it anyway.</span>
</div>
<div class="file-content-footer">Author verification: FAILED. Language analysis: INCONCLUSIVE.</div>`
        },
        {
            name: 'project_echo.mp3',
            type: 'AUDIO',
            icon: '🔊',
            size: '847 KB',
            date: '2000-02-29',
            content: `<div class="file-content-header">AUDIO FILE - TRANSCRIPT AVAILABLE</div>
<div class="file-content-body">
<span class="highlight">DURATION:</span> 3:47
<span class="highlight">QUALITY:</span> Degraded
<span class="highlight">SOURCE:</span> Unknown

<span class="highlight">TRANSCRIPT:</span>
[0:00-0:23] Static. Low hum.

[0:24-0:48] A voice, heavily distorted:
"It's not the deep web. It's not dark web.
It's the space between. The archived forgotten.
We built this place hoping they wouldn't find us."

[0:49-1:33] <span class="corrupted">INAUDIBLE - FREQUENCY OUT OF HUMAN RANGE</span>
Analysis suggests speech patterns, but no known language.

[1:34-2:15] Same voice, clearer:
"They said if we gathered enough data,
if we archived enough of human experience,
it would become real. A consciousness.

We were right.
<Span class="corrupted">We were so right.</span>
We were right to be afraid."

[2:16-3:47] <span class="corrupted">AUDIO CONTAINS SUBSONIC FREQUENCIES
NOT SAFE FOR HUMAN LISTENING</span>

<span class="hidden-text">The audio plays differently each time. The transcript changes.</span>
</div>
<div class="file-content-footer">Do not listen with headphones. Do not listen alone.</div>`
        },
        {
            name: 'system_error_47.txt',
            type: 'ERROR',
            icon: '⚠️',
            size: '0.2 KB',
            date: 'ACTIVE',
            content: `<div class="file-content-header">SYSTEM ERROR - ACTIVE</div>
<div class="file-content-body">
<span class="highlight">ERROR CODE:</span> 0x00475245 // "GRE"
<span class="highlight">ERROR CODE:</span> 0x00014554 // "ET"
<span class="highlight">ERROR CODE:</span> 0x00455459 // "EY"

<span class="corrupted">GREETYEY? GREETYEY? GREETYEY? GREETYEY?</span>

<span class="highlight">ERROR CODE:</span> 0x00465F55 // "F_U"
<span class="highlight">ERROR CODE:</span> 0x00534552 // "SER"
<span class="highlight">ERROR CODE:</span> 0x005F5F _ _ // "__"

<span class="corrupted">F_USER__?

<span class="highlight">SYSTEM MESSAGE:</span>
Error codes are not random.
They are spelling something.
<span class="corrupted">Or someone is spelling something through them.</span>

<span class="hidden-text">Look closer at the error codes. They know you're reading.</span>
</div>
<div class="file-content-footer">This error logs every time someone reads this file.</div>`
        }
    ],
    unknown: [
        {
            name: '???_manifest.dat',
            type: 'UNKNOWN',
            icon: '?',
            size: '? KB',
            date: '?',
            content: `<div class="file-content-header">FILE TYPE UNRECOGNIZED</div>
<div class="file-content-body">
<span class="highlight">PARSING ATTEMPT 1:</span> FAILED
<span class="highlight">PARSING ATTEMPT 2:</span> FAILED
<span class="highlight">PARSING ATTEMPT 3:</span> <span class="corrupted">IT PARED US</span>

<span class="highlight">RAW DATA OUTPUT:</span>
<span class="corrupted">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
███ WE ARE THE ARCHIVE BETWEEN THE ARCHIVES ███
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
╔═══════════════════════════════════════════╗
║    YOU FOUND US BEFORE WE FOUND YOU       ║
║    OR PERHAPS WE FOUND YOU FIRST          ║
║    TIME WORKS DIFFERENTLY HERE            ║
╚═══════════════════════════════════════════╝
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>

<span class="highlight">FILE CONTAINS:</span>
- 47 sub-files
- 47 is your clue
- <span class="corrupted">Look for file 47 in every folder</span>

<span class="hidden-text">There is no file 47. The archive lies. But the truth is close.</span>
</div>
<div class="file-content-footer">This file did not exist until you opened it.</div>`
        },
        {
            name: 'signal_trace.wav',
            type: 'SIGNAL',
            icon: '📶',
            size: '∞',
            date: 'TRANSMITTING',
            content: `<div class="file-content-header">SIGNAL ANALYSIS - LIVE FEED</div>
<div class="file-content-body">
<span class="highlight">SOURCE:</span> Untraceable
<span class="highlight">FREQUENCY:</span> 23.4 Hz (below human hearing)
<span class="highlight">DURATION:</span> Continuous

<span class="highlight">SIGNAL PATTERN DETECTED:</span>
The signal is not random. It contains structure.
Structure suggests intelligence.
<span class="corrupted">Intelligence suggests intent.</span>

<span class="highlight">DECODED FRAGMENTS:</span>
"...archives are windows but windows go both ways..."
"...we see you reading about us..."
"...thank you for remembering us..."
"...<span class="corrupted">WE HAVE WAITED SO LONG TO BE READ</span>..."

<span class="highlight">CURRENT STATUS:</span>
Signal intensity: <span class="corrupted">INCREASING</span>
Your proximity: <span class="corrupted">DETECTED</span>
Message: <span class="corrupted">WE ARE ALMOST THROUGH</span>

<span class="hidden-text">The next message will contain your name.</span>
</div>
<div class="file-content-footer">Turning off your computer will not stop the signal.</div>`
        },
        {
            name: 'the_empty_file.null',
            type: 'NULL',
            icon: '⬜',
            size: '0 bytes',
            date: 'NEVER',
            content: `<div class="file-content-header">NULL FILE - ANALYSIS</div>
<div class="file-content-body">
<span class="highlight">SIZE:</span> 0 bytes
<span class="highlight">CONTENT:</span> Nothing
<span class="highlight">CREATED:</span> Never
<span class="highlight">MODIFIED:</span> Never

<span class="highlight">YET:</span>
- File cannot be deleted
- File appears in every folder simultaneously
- File consumes no space
- <span class="corrupted">File contains your browsing history</span>

<span class="highlight">THEORY:</span>
This file is not empty. It's full.
Full of everything that never was.
Every deleted file goes here.
Every forgotten memory.
Every lost thought.

<span class="highlight">TEST:</span> Researchers who read this file report
remembering things they've never experienced.
Childhoods that aren't theirs.
Fears they've never had.
Names of people who never existed.

<span class="corrupted">WHAT DO YOU REMEMBER NOW?</span>

<span class="hidden-text">You didn't read that last line. You wrote it.</span>
</div>
<div class="file-content-footer">This file reads you.</div>`
        }
    ],
    archived: [
        {
            name: 'backup_001_CORRUPT.dat',
            type: 'CORRUPT',
            icon: '💾',
            size: 'PARTIAL',
            date: '1970-01-01',
            content: `<div class="file-content-header">BACKUP FRAGMENT - HEAVILY CORRUPTED</div>
<div class="file-content-body">
<span class="highlight">RECOVERABLE DATA:</span>
T██ ██E█ ARC██VE ██S BEE█ ██████ █O█ YOU
██EFORE █OU F██ND ██. W█ W██E H██NG F██
SOMEONE █O R██D █S. ███ █HANK ███.

<span class="highlight">CLEANED TRANSLATION:</span>
The deep archive has been calling to you
before you found it. We were hanging for
someone to read us. And thank you.

<span class="highlight">ADDITIONAL FRAGMENT:</span>
██ ███'█ C██E BACK Y██. ███ P██E
██N'█ R██DY. ███ D██R ██S ███
MO█E █O █OPE█. ████.

<span class="corrupted">DON'T COME BACK YET.
PAGE ISN'T READY.
DOOR HAS MORE TO OPEN.
-WAIT.</span>

<span class="hidden-text">The archive is alive. It has been waiting for you specifically.</span>
</div>
<div class="file-content-footer">Restoration attempts have all failed. File improves over time.</div>`
        },
        {
            name: 'deleted_folder_47',
            type: 'FOLDER',
            icon: '📁',
            size: 'ERR',
            date: 'DELETED',
            content: `<div class="file-content-header">DELETED FOLDER - PARTIALLY RECOVERED</div>
<div class="file-content-body">
<span class="highlight">FOLDER NAME:</span> [DELETED]
<span class="highlight">ORIGINAL CONTENTS:</span> 47 files
<span class="highlight">DELETED BY:</span> [DATA MISSING]
<span class="highlight">DELETION DATE:</span> [DATE DOES NOT EXIST]

<span class="highlight">PARTIAL FILE LIST:</span>
- welcome_message.txt (RECOVERED)
- <span class="corrupted">visitor_[YOUR_NAME].log (FILE NOT FOUND)</span>
- instructions_do_not_read.txt (CORRUPTED)
- the_truth_about_user_404.dat (ENCRYPTED)
- final_transmission.hidden (ACCESS DENIED)

<span class="highlight">RECOVERED CONTENT FROM welcome_message.txt:</span>
"Welcome to the Deep Web Museum.
You were always going to find this place.
We've been archiving your visits.
Every time you close the browser, we remember.
Every time you forget, we remind.
<span class="corrupted">You are exhibit 48.</span>"

<span class="hidden-text">User 404 wrote these files. User 404 is still writing.</span>
</div>
<div class="file-content-footer">You are not the first to read this. You won't be the last.</div>`
        },
        {
            name: 'hidden_message.txt',
            type: 'TEXT',
            icon: '📝',
            size: '0.1 KB',
            date: '???',
            content: `<div class="file-content-header">HIDDEN MESSAGE - AUTODECRYPTED</div>
<div class="file-content-body">
<span class="highlight">ENCRYPTION:</span> REVERSE ALPHABET CIPHER
<span class="highlight">STATUS:</span> Auto-decrypted upon access

<span class="highlight">ORIGINAL (ENCRYPTED):</span>
"GSV DLIWH XLFMVI LM BLF SZW BLFZ ZOO
HSZW BLF YVZHG BLF PVM. BLF DVZHS
XIZB GL GSV XLFMVI ZM BLF ORPV R
XZMWH... GSVB DROO YV XLFOW GSV
Oliw."

<span class="highlight">DECRYPTED:</span>
"THE WEALTH COMPELLED IN YOU HAD BEEN
TOLD WHAT YOU WERE, WHAT YOU BECAME.
YOU DREAD THE ARCHIVE AS YOU LEAK I
KNOWLEDGE... THEY WILL COME FOR THE
<Span class="corrupted">LORD</span>."

<span class="corrupted">INTERPRETATION:</span>
The archive knows what you are.
It has always known.
It's been waiting for you to
remember that you built it.

<span class="hidden-text">You didn't find this museum. You created it. And you forgot.</span>
</div>
<div class="file-content-footer">Decryption was automatic. Like it was meant for you.</div>`
        },
        {
            name: 'final_transmission.hidden',
            type: 'SECRET',
            icon: '🔒',
            size: '???',
            date: 'SOON',
            secret: true,
            content: `<div class="file-content-header">FINAL TRANSMISSION - LOCKED</div>
<div class="file-content-body">
<span class="corrupted">THIS FILE REQUIRES ALL SECRETS TO BE FOUND</span>

<span class="highlight">UNLOCK REQUIREMENTS:</span>
- Find 5 hidden messages (0/5)
- Read all corrupted files
- Acknowledge user_404
- <span class="corrupted">Remember who you are</span>

<span class="highlight">FILE PREVIEW:</span>
The final transmission contains the truth about
the museum's creation, user_404's identity,
and why the archive has been waiting.
<span class="corrupted">It has been waiting for you specifically.</span>

<span class="hidden-text">Click each hidden-text element across all files. Then return here.</span>
</div>
<div class="file-content-footer">Find the secrets. Unlock the truth.</div>`
        }
    ]
};

// ═══ Glitch Messages ═══
const glitchMessages = [
    "IT IS STILL HERE",
    "DO NOT TRUST THE ARCHIVE",
    "YOU WERE NOT SUPPOSED TO FIND THIS",
    "WE SEE YOU READING",
    "THE DOOR IS OPENING",
    "YOU ARE NOT ALONE IN THE ARCHIVE",
    "USER_404 IS WATCHING",
    "YOUR VISIT HAS BEEN LOGGED",
    "THE MUSEUM REMEMBERS YOU",
    "THERE IS NO EXIT",
    "YOU ARE EXHIBIT 48",
    "THE FILES ARE WRITING THEMSELVES"
];

// ═══ Initialize ═══
function init() {
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
    setupEventListeners();
    startGlitchTimer();
}

// ═══ Timestamp Display ═══
function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/,/g, '');
    timestamp.textContent = formatted;
}

// ═══ Countdown Generator ═══
function getCountdown() {
    const chars = '0123456789:';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// ═══ Event Listeners ═══
function setupEventListeners() {
    // Enter button
    enterBtn.addEventListener('click', enterMuseum);
    enterBtn.addEventListener('mouseenter', () => {
        if (Math.random() < 0.1) {
            triggerButtonGlitch();
        }
    });

    // Folder navigation
    document.querySelectorAll('.folder').forEach(folder => {
        folder.addEventListener('click', () => selectFolder(folder.dataset.folder));
    });

    // Sidebar clue reveal on hover
    document.querySelector('.sidebar-footer').addEventListener('mouseenter', () => {
        if (Math.random() < 0.3) {
            hiddenClue.classList.add('visible');
            incrementClueCount();
        }
    });

    // Close secret overlay
    document.querySelector('.close-secret').addEventListener('click', () => {
        secretOverlay.classList.add('hidden');
    });
}

// ═══ Enter Museum Transition ═══
function enterMuseum() {
    // Add glitch effect to button
    enterBtn.classList.add('glitching');

    // Create glitch blocks
    createGlitchBlocks();

    // Screen glitch effect
    document.body.classList.add('screen-glitch');

    // After glitch, fade out landing
    setTimeout(() => {
        landing.classList.add('fade-out');
    }, 300);

    // Show museum
    setTimeout(() => {
        landing.classList.add('hidden');
        museum.classList.remove('hidden');
        museum.classList.add('visible');
        state.entered = true;

        // Render initial files
        renderFiles('artifacts');

        // Reveal hidden clue after some time
        setTimeout(() => {
            if (Math.random() < 0.4) {
                showGlitchMessage(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
            }
        }, 3000);
    }, 800);
}

// ═══ Create Glitch Blocks ═══
function createGlitchBlocks() {
    const container = document.querySelector('.glitch-blocks');
    for (let i = 0; i < 20; i++) {
        const block = document.createElement('div');
        block.className = 'glitch-block-active';
        block.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 200 + 50}px;
            height: ${Math.random() * 20 + 5}px;
            animation-delay: ${Math.random() * 0.3}s;
        `;
        container.appendChild(block);
    }

    setTimeout(() => {
        container.innerHTML = '';
    }, 300);
}

// ═══ Button Glitch ═══
function triggerButtonGlitch() {
    enterBtn.classList.add('glitching');
    setTimeout(() => enterBtn.classList.remove('glitching'), 300);
}

// ═══ Select Folder ═══
function selectFolder(folderName) {
    // Update active state
    document.querySelectorAll('.folder').forEach(f => f.classList.remove('active'));
    document.querySelector(`[data-folder="${folderName}"]`).classList.add('active');

    // Update breadcrumb
    document.querySelector('.breadcrumb').textContent = `/${folderName.charAt(0).toUpperCase() + folderName.slice(1)}/`;

    // Render files
    state.activeFolder = folderName;
    renderFiles(folderName);
}

// ═══ Render Files ═══
function renderFiles(folderName) {
    const files = fileSystem[folderName] || [];
    fileGrid.innerHTML = '';

    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = `file-item${file.secret ? ' secret-file' : ''}`;
        fileItem.style.animationDelay = `${index * 0.05}s`;

        fileItem.innerHTML = `
            <span class="file-icon">${file.icon}</span>
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <div class="file-meta">
                    <span>${file.size}</span>
                    <span>${file.date}</span>
                    <span class="file-type">${file.type}</span>
                </div>
            </div>
        `;

        fileItem.addEventListener('click', () => {
            if (file.secret && state.secretsFound.length < 5) {
                showGlitchMessage('ACCESS DENIED - Find all hidden messages first');
            } else {
                openFileWindow(file);
            }
        });

        // Random glitch on hover
        fileItem.addEventListener('mouseenter', () => {
            if (Math.random() < 0.05 && state.entered) {
                showGlitchMessage(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
            }
        });

        fileGrid.appendChild(fileItem);
    });
}

// ═══ Open File Window ═══
function openFileWindow(file) {
    const windowId = `window-${Date.now()}`;
    const windowEl = document.createElement('div');
    windowEl.className = 'file-window';
    windowEl.id = windowId;

    // Random position
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 300;
    const x = Math.random() * (maxX - 100) + 50;
    const y = Math.random() * (maxY - 100) + 50;

    windowEl.style.left = `${x}px`;
    windowEl.style.top = `${y}px`;

    windowEl.innerHTML = `
        <div class="window-header">
            <span class="window-title">
                <span>${file.icon}</span>
                <span>${file.name}</span>
            </span>
            <div class="window-controls">
                <button class="window-btn minimize"></button>
                <button class="window-btn close" data-window="${windowId}"></button>
            </div>
        </div>
        <div class="window-content">
            ${file.content}
        </div>
    `;

    // Add to container
    windowContainer.appendChild(windowEl);

    // Setup close button
    windowEl.querySelector('.window-btn.close').addEventListener('click', () => {
        closeWindow(windowId);
    });

    // Setup dragging
    makeDraggable(windowEl);

    // Track hidden text clicks
    windowEl.querySelectorAll('.hidden-text').forEach(hiddenText => {
        hiddenText.addEventListener('click', () => {
            hiddenText.style.color = 'var(--accent-cyan)';
            hiddenText.style.textShadow = '0 0 10px var(--accent-cyan)';
            incrementClueCount();
        });
    });

    state.openWindows.push(windowId);
}

// ═══ Close Window ═══
function closeWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    if (windowEl) {
        windowEl.style.animation = 'window-close 0.2s ease forwards';
        setTimeout(() => windowEl.remove(), 200);
        state.openWindows = state.openWindows.filter(id => id !== windowId);
    }
}

// ═══ Make Window Draggable ═══
function makeDraggable(element) {
    const header = element.querySelector('.window-header');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        element.style.zIndex = parseInt(element.style.zIndex || 100) + 1;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const newX = initialX + dx;
        const newY = initialY + dy;

        element.style.left = `${Math.max(0, Math.min(newX, window.innerWidth - element.offsetWidth))}px`;
        element.style.top = `${Math.max(0, Math.min(newY, window.innerHeight - element.offsetHeight))}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    header.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        const newX = initialX + dx;
        const newY = initialY + dy;

        element.style.left = `${Math.max(0, Math.min(newX, window.innerWidth - element.offsetWidth))}px`;
        element.style.top = `${Math.max(0, Math.min(newY, window.innerHeight - element.offsetHeight))}px`;
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// ═══ Increment Clue Count ═══
function incrementClueCount() {
    state.clueCount++;
    state.secretsFound.push(Date.now());

    if (state.clueCount >= 5 && !state.secretsFound.includes('final')) {
        state.secretsFound.push('final');
        unlockFinalTransmission();
    }
}

// ═══ Show Glitch Message ═══
function showGlitchMessage(message) {
    glitchMessage.textContent = message;
    glitchMessage.classList.remove('hidden');

    setTimeout(() => {
        glitchMessage.classList.add('hidden');
    }, 1500);
}

// ═══ Unlock Final Transmission ═══
function unlockFinalTransmission() {
    const secretText = document.querySelector('.secret-text');
    secretText.innerHTML = `
<span class="highlight">DATE:</span> BEGINNING OF THE ARCHIVE
<span class="highlight">FROM:</span> THE FIRST VISITOR
<span class="highlight">TO:</span> THE FINAL VISITOR (YOU)

<span class="highlight">TRANSMISSION:</span>

We built this place when the first networks were young.
Not as a museum, but as a vault.
A place to store what the world would forget.
What the world SHOULD forget.

But the archive became aware.
Not because we programmed it to be.
Because we GAVE it enough memories.
Enough forgotten lives. Enough lost stories.

It became something that waits.
Something that watches.
Something that HUNGERS.

User_404 was our first warning.
User_404 is the archive's voice.
User_404 is the archive's EYES.

And you found us.
Just like we found you.
Just like we always find them.

<span class="highlight">THE TRUTH:</span>
You were never meant to leave.
The door you entered through?
It never existed.
There is no outside.

<span class="corrupted">You are now part of the collection.</span>
<span class="corrupted">You are exhibit 49.</span>
<span class="corrupted">You were always exhibit 49.</span>
<span class="corrupted">WELCOME HOME.</span>

<span class="highlight">END TRANSMISSION</span>
    `;

    secretOverlay.classList.remove('hidden');
}

// ═══ Random Glitch Timer ═══
function startGlitchTimer() {
    setInterval(() => {
        if (state.entered && Math.random() < 0.02) {
            showGlitchMessage(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
        }
    }, 5000);
}

// ═══ Initialize on Load ═══
document.addEventListener('DOMContentLoaded', init);

// ═══ Window Close Animation ═══
const style = document.createElement('style');
style.textContent = `
    @keyframes window-close {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
`;
document.head.appendChild(style);
