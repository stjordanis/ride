;(function(){'use strict'

//mapping between various elements of the APL language and their urls in the online help, e.g.
// D.hlp['⍴']     -> 'http://help.dyalog.com/15.0/Content/Language/Symbols/Rho.htm'
// D.hlp[')vars'] -> 'http://help.dyalog.com/15.0/Content/Language/System%20Commands/vars.htm'

var p='http://help.dyalog.com/15.0/Content/',q='.htm' //prefix and suffix
var h=D.hlp={WELCOME:p+'MiscPages/HelpWelcome'+q,
             UCMDS:p+'UserGuide/The APL Environment/User Commands'+q,
             LANGELEMENTS:p+'Language/Introduction/Language Elements'+q}

var u=p+'Language/System Commands/'
var a='classes clear cmd continue copy cs drop ed erase events fns holds lib load methods ns objects obs off ops pcopy props reset save sh sic si sinl tid vars wsid xload'.split(' ')
for(var i=0;i<a.length;i++)h[')'+a[i]]=u+a[i]+q

var u=p+'Language/System Functions/'
h.SYSFNS=u+'System Functions Categorised'+q
h['⍞']=u+'Character Input Output'+q
h['⎕']=u+'Evaluated Input Output'+q
h['⎕á']=h['⎕ⓐ']=u+'Underscored Alphabetic Characters'+q
var a='a ai an arbin arbout at av avu base class clear cmd cr cs csv ct cy d dct df div dl dm dmx dq dr ed em en ex exception export fappend favail fchk fcopy fcreate fdrop ferase fhist fhold fix flib fmt fnames fnums fprops fr frdac frdci fread frename freplace fresize fsize fstac fstie ftie funtie fx instances io json kl lc load lock lx map mkdir ml monitor na nappend nc ncreate ndelete nerase new nexists nget ninfo nl nlock nnames nnums nparts nput nq nr nread nrename nreplace nresize ns nsi nsize ntie null nuntie nxlate off opt or path pfkey pp profile pw r refs rl rsi rtl s save sd se sh shadow si signal size sm sr src stack state stop svc svo svq svr svs tc tcnums tget this tid tkill tname tnums tpool tput trace trap treq ts tsync ucs using vfi vr wa wc wg wn ws wsid wx xml xsi xt'.split(' ')
for(var i=0;i<a.length;i++)h['⎕'+a[i]]=u+a[i]+q

var u=p+'Language/Control Structures/'
h.CTRLSTRUCTS=u+'Control Structures Summary'+q
var a='access attribute class continue disposable for goto hold if implements interface leave namespace repeat return section select signature trap using while with'.split(' ')
for(var i=0;i<a.length;i++)h[':'+a[i]]=u+a[i]+q

var u=p+'Language/Symbols/'
var a='&Ampersand ]Brackets ⊖Circle_Bar ○Circle ⌽Circle_Stile ⍪Comma_Bar ,Comma ⊥Decode_Symbol ¨Dieresis ⍣DieresisStar ⍨Dieresis_Tilde ÷Divide_Sign ⌹Domino .Dot ↓Down_Arrow ⌊Downstile ⊤Encode_Symbol ∊Epsilon ⍷Epsilon_Underbar =Equal_Sign ≡Equal_Underbar ≢Equal_Underbar_Slash !Exclamation_Mark ⍎Execute_Symbol ⍒Grade_Down ⍋Grade_Up ≥Greater_Than_Or_Equal_To_Sign >Greater_Than_Sign ⌶IBeam ⌷Index_Symbol ⍳Iota ⍸Iota_Underbar ⍤Jot_Diaresis ∘Jot ⊂Left_Shoe ⊆Left_Shoe_Underbar ⊣Left_Tack ≤Less_Than_Or_Equal_To_Sign <Less_Than_Sign ⍟Log ∧Logical_And ∨Logical_Or -Minus_Sign ⍲Nand_Symbol ⍱Nor_Symbol ≠Not_Equal_To +Plus_Sign ⌸Quad_Equal ?Question_Mark ⍴Rho →Right_Arrow ⊃Right_Shoe ⊢Right_Tack ∩Set_Intersection ∪Set_Union ⌿Slash_Bar /Slash ⍀Slope_Bar \\Slope *Star |Stile ⍕Thorn_Symbol ~Tilde ×Times_Sign ⍉Transpose ↑Up_Arrow ⌈Upstile ⍠Variant ⍬Zilde_Symbol'.split(' ')
for(var i=0;i<a.length;i++)h[a[i][0]]=u+a[i].slice(1).replace(/_/g,' ')+q
var b="#⍺⍵∇'⋄⍝:;¯";for(var i=0;i<b.length;i++)h[b[i][0]]=u+'Special Symbols'+q

var u=p+'Language/Primitive Operators/' //I-beams
var a=D.ibeams={ // http://help.dyalog.com/15.0/Content/Language/Primitive%20Operators/I%20Beam.htm
    8:'Inverted Table Index Of',
   85:'Execute Expression',
  127:'Overwrite Free Pockets',
  180:'Canonical Representation',
  181:'Unsqueezed Type',
  200:'Syntax Colouring',
  219:'Compress Vector of Short Integers',
  220:'Serialise Array',
  400:'Compiler Control',
  600:'Trap Control',
  819:'Case Convert',
  900:'Called Monadically',
  950:'Loaded Libraries',
 1111:'Number Of Threads',
 1112:'Parallel Execution Threshold',
 1159:'Update Function Timestamp',
 1500:'Hash Array',
 2000:'Memory Manager Statistics',
 2002:'Specify Workspace Available',
 2010:'Update DataTable',           //W
 2011:'Read DataTable',             //W
 2014:'Remove Data Binding',        //W
 2015:'Create Data Binding Source', //W
 2016:'Create .NET Delegate',       //W
 2017:'Identify NET Type',          //W
 2022:'Flush Session Caption',      //W
 2023:'Close All Windows',          //W
 2035:'Set Dyalog Pixel Type',
 2041:'Override COM Default Value', //W
 2100:'Export To Memory',           //W
 2101:'Close .NET AppDomain',       //W
 2400:'Set Workspace Save Options',
 2401:'Expose Root Properties',
 2501:'Discard Thread on Exit',      //W
 2502:'Discard Parked Threads',      //W
 2503:'Mark Thread as Uninterruptible',
 2520:'Use Separate Thread For .NET',
 3002:'Disable Component Checksum Validation',
 3500:'Send Text to RIDE-embedded Browser',
 3501:'Connected to the RIDE',
 3502:'Manage RIDE Connections',
 4000:'Fork New Task',              //X
 4001:'Change User',                //X
 4002:'Reap Forked Tasks',          //X
 4007:'Signal Counts',              //X
 5176:'List Loaded Files',
 5177:'List Loaded File Objects',
 7159:'JSON Import',
 7160:'JSON Export',
 7161:'JSON TrueFalse',
 7162:'JSON Translate Name',
 8415:'Singular Value Decomposition',
16807:'Random Number Generator',
50100:'Line Count'
}
for(var k in a)h[k+'⌶']=u+a[k]+q

}());
