import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.55909e31.js";const l="/notes/assets/sam-admin-smart-form-dialog.763f9918.png",t="/notes/assets/smart-form-fields-dialog.8a586b69.png",g=JSON.parse('{"title":"MyInteract Smart Forms","description":"","frontmatter":{},"headers":[],"relativePath":"my_interact/working-on-smart-forms.md","filePath":"my_interact/working-on-smart-forms.md"}'),o={name:"my_interact/working-on-smart-forms.md"},p=n('<h1 id="myinteract-smart-forms" tabindex="-1">MyInteract Smart Forms <a class="header-anchor" href="#myinteract-smart-forms" aria-label="Permalink to &quot;MyInteract Smart Forms&quot;">​</a></h1><p><sub>(as of September 2023)</sub></p><p>MyInteract uses smart forms to collate form submissions (eg. registration forms, surveys, voting polls) or send out custom forms (such as calculation results, quiz results). Smart forms are used in assets, which are then uploaded to SAM to be used by any myInteract user who has access to that asset.</p><h2 id="setting-up" tabindex="-1">Setting up <a class="header-anchor" href="#setting-up" aria-label="Permalink to &quot;Setting up&quot;">​</a></h2><p>Before you can start on anything, make sure you have access to the following:</p><ul><li>Test SAM access</li><li>Mockup design of the asset</li><li>PDF design (if there&#39;s any)</li><li>The important bit is too know which data you&#39;ll be using for the smart form</li></ul><h2 id="how-it-works" tabindex="-1">How it works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How it works&quot;">​</a></h2><p>Using itSam, you can pass the form field values from an asset to the smart form. The data will then be automatically transferred to a PDF, then a copy will be sent to the set recipient (usually the company who owns the asset or an MI admin), the MI user or both.</p><h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2><p>Do your thing and build the asset and make sure that you can render all required data to be used for the smart form. The form data does not have to match the fields for the smart form at this point. As long as the code is readable and functioning properly.</p><p>Later, a composable will be introduced which will make the transfer of the form data to the smart form a bit easier.</p><h2 id="uploading-the-smart-form" tabindex="-1">Uploading the Smart Form <a class="header-anchor" href="#uploading-the-smart-form" aria-label="Permalink to &quot;Uploading the Smart Form&quot;">​</a></h2><p>Before we can do anything with the smart form fields, the PDF design (with fillable fields, <a href="#naming-smart-form-fields">(important) see how to properly name smart form fields here</a>) should be uploaded in SAM.</p><ul><li><p>Upload the PDF in SAM with the company of your choice.</p><p><img src="'+l+'" alt="Alt text" title="image of smart form upload dialog box"></p></li><li><p>After uploading the PDF, you should be able to click the &#39;Show Questions/Fields&#39;</p><p><img src="'+t+`" alt="Alt text" title="image of smart form upload dialog box"></p></li><li><p>Download the JSON file as we will be using that later for generating the payload required for the smart form.</p></li></ul><h2 id="piecing-things-together" tabindex="-1">Piecing things together <a class="header-anchor" href="#piecing-things-together" aria-label="Permalink to &quot;Piecing things together&quot;">​</a></h2><p>Now that we have the <em>form data</em> and the <em>smart form fields</em>, we can now combine the pieces together. We&#39;ll have to read SAM Web API docs, specifically the <strong><em>postSurveyResults</em></strong> under the Smartform API. (Please ask Aaron for the access to the API sheet, everything you might need is in there.)</p><blockquote><p>&quot;Submits Smart Form responses to SAM. NOTE: For legacy these are called Surveys/Forms as they used to hanfle Surveys/Quizzes but only support PDF Forms now. 16-OCT-17 - V3 now supports a total of 320 fields - 300 Text, 20 Images.&quot;</p></blockquote><p>TLDR: This will handle the data we&#39;re submitting and be transferred to the PDF we uploaded in SAM.</p><h3 id="path" tabindex="-1">Path <a class="header-anchor" href="#path" aria-label="Permalink to &quot;Path&quot;">​</a></h3><p>For the axios request – <em><strong>(itSam.baseUrl)/rest/survey/results</strong></em></p><h3 id="http-request-params-object" tabindex="-1">HTTP Request Params/Object <a class="header-anchor" href="#http-request-params-object" aria-label="Permalink to &quot;HTTP Request Params/Object&quot;">​</a></h3><p>The general structure of the object that should be submitted to the API. This seems a lot of work if you will manually match the fields, so I did a <a href="#tosmartformpayload-composable">composable</a> which can be reused regardless of how many fields are in the smart form.</p><p><strong>An array of responses</strong></p><ul><li><strong>NOTE:</strong> &quot;R&quot; denotes a Text Response whilst &quot;I&quot; denotes and Image Response.</li><li><strong>NOTE:</strong> All images should be sent as BASE64 text representations.</li><li><strong>NOTE:</strong> for &quot;version&quot; &gt;= 2 clients MUST provide &quot;clientFormUUID&quot; values. If no &quot;version&quot; provided then it defaults to V1 and no &quot;clientFormUUID&quot; values are required.</li><li><strong>NOTE:</strong> Version 3 added 100 new text fields and was bumped just so we can differentiate the change. However, passing 300 text fields with v1 or v2 will still work.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{ &quot;resultset&quot; :</span></span>
<span class="line"><span style="color:#e1e4e8;">     [ { &quot;Q1&quot; : { &quot;R1&quot; : &quot;true&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;Q2&quot; : { &quot;R2&quot; : &quot;true&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R3&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R4&quot; : &quot;true&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R5&quot; : &quot;false&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          },</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;clientFormUUID&quot; : &quot;ClientFormUUID365&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;submitted&quot; : 1445402419921</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { &quot;Q1&quot; : { &quot;R1&quot; : &quot;true&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;Q2&quot; : { &quot;R2&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R3&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R4&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;R5&quot; : &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          },</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;clientFormUUID&quot; : &quot;ClientFormUUID366&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;submitted&quot; : 1445402419921</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;surveyId&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;version&quot; : 2</span></span>
<span class="line"><span style="color:#e1e4e8;">}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{ &quot;resultset&quot; :</span></span>
<span class="line"><span style="color:#24292e;">     [ { &quot;Q1&quot; : { &quot;R1&quot; : &quot;true&quot; },</span></span>
<span class="line"><span style="color:#24292e;">        &quot;Q2&quot; : { &quot;R2&quot; : &quot;true&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R3&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R4&quot; : &quot;true&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R5&quot; : &quot;false&quot;</span></span>
<span class="line"><span style="color:#24292e;">          },</span></span>
<span class="line"><span style="color:#24292e;">        &quot;clientFormUUID&quot; : &quot;ClientFormUUID365&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;submitted&quot; : 1445402419921</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      { &quot;Q1&quot; : { &quot;R1&quot; : &quot;true&quot; },</span></span>
<span class="line"><span style="color:#24292e;">        &quot;Q2&quot; : { &quot;R2&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R3&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R4&quot; : &quot;false&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;R5&quot; : &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">          },</span></span>
<span class="line"><span style="color:#24292e;">        &quot;clientFormUUID&quot; : &quot;ClientFormUUID366&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;submitted&quot; : 1445402419921</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;surveyId&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;version&quot; : 2</span></span>
<span class="line"><span style="color:#24292e;">}&quot;</span></span></code></pre></div><h3 id="an-example" tabindex="-1">An example <a class="header-anchor" href="#an-example" aria-label="Permalink to &quot;An example&quot;">​</a></h3><p>Here is an example of all the data you will need for the API. The format of the <strong>resultForm</strong> is important if you&#39;re going to use the composable that I made that will translate it to the &quot;resultset&quot; format required for the request. If you have your own method of doing it, then you can skip these.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">const completedForm = props.form</span></span>
<span class="line"><span style="color:#e1e4e8;">const calculatedResult = props.result</span></span>
<span class="line"><span style="color:#e1e4e8;">const timestamp = Date.now()</span></span>
<span class="line"><span style="color:#e1e4e8;">const sessionId = uuidv4()</span></span>
<span class="line"><span style="color:#e1e4e8;">const formId = 2882</span></span>
<span class="line"><span style="color:#e1e4e8;">const deviceTypeStore = useDeviceTypeStore()</span></span>
<span class="line"><span style="color:#e1e4e8;">const userStore = useUserStore()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">let filteredDosageAdministrationList = computed(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return completedForm.disease.name.includes(&#39;CF&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    ? dosageAdministrationList.filter((listItem, index) =&gt; index &lt; 2)</span></span>
<span class="line"><span style="color:#e1e4e8;">    : dosageAdministrationList</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const resultForm = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  DiseaseName: completedForm.disease.name,</span></span>
<span class="line"><span style="color:#e1e4e8;">  CalculationResultDosageLabel: calculatedResult.dosage_label,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ProductDose: completedForm.product.dose,</span></span>
<span class="line"><span style="color:#e1e4e8;">  CalculationResultDosage: calculatedResult.dosage,</span></span>
<span class="line"><span style="color:#e1e4e8;">  UrsofalkProductImage: completedForm.product.image_url,</span></span>
<span class="line"><span style="color:#e1e4e8;">  AdministrationListItem1: filteredDosageAdministrationList.value[0].description,</span></span>
<span class="line"><span style="color:#e1e4e8;">  AdministrationListItem2: filteredDosageAdministrationList.value[1].description,</span></span>
<span class="line"><span style="color:#e1e4e8;">  AdministrationListItem3: filteredDosageAdministrationList.value[2]</span></span>
<span class="line"><span style="color:#e1e4e8;">    ? filteredDosageAdministrationList.value[2].description</span></span>
<span class="line"><span style="color:#e1e4e8;">    : &#39;&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ListItemBulletImage1: BulletIcon,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ListItemBulletImage2: BulletIcon,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ListItemBulletImage3: filteredDosageAdministrationList.value[2] ? BulletIcon : &#39;&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  User_emailable: userStore.user.email</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">const completedForm = props.form</span></span>
<span class="line"><span style="color:#24292e;">const calculatedResult = props.result</span></span>
<span class="line"><span style="color:#24292e;">const timestamp = Date.now()</span></span>
<span class="line"><span style="color:#24292e;">const sessionId = uuidv4()</span></span>
<span class="line"><span style="color:#24292e;">const formId = 2882</span></span>
<span class="line"><span style="color:#24292e;">const deviceTypeStore = useDeviceTypeStore()</span></span>
<span class="line"><span style="color:#24292e;">const userStore = useUserStore()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">let filteredDosageAdministrationList = computed(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  return completedForm.disease.name.includes(&#39;CF&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    ? dosageAdministrationList.filter((listItem, index) =&gt; index &lt; 2)</span></span>
<span class="line"><span style="color:#24292e;">    : dosageAdministrationList</span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const resultForm = {</span></span>
<span class="line"><span style="color:#24292e;">  DiseaseName: completedForm.disease.name,</span></span>
<span class="line"><span style="color:#24292e;">  CalculationResultDosageLabel: calculatedResult.dosage_label,</span></span>
<span class="line"><span style="color:#24292e;">  ProductDose: completedForm.product.dose,</span></span>
<span class="line"><span style="color:#24292e;">  CalculationResultDosage: calculatedResult.dosage,</span></span>
<span class="line"><span style="color:#24292e;">  UrsofalkProductImage: completedForm.product.image_url,</span></span>
<span class="line"><span style="color:#24292e;">  AdministrationListItem1: filteredDosageAdministrationList.value[0].description,</span></span>
<span class="line"><span style="color:#24292e;">  AdministrationListItem2: filteredDosageAdministrationList.value[1].description,</span></span>
<span class="line"><span style="color:#24292e;">  AdministrationListItem3: filteredDosageAdministrationList.value[2]</span></span>
<span class="line"><span style="color:#24292e;">    ? filteredDosageAdministrationList.value[2].description</span></span>
<span class="line"><span style="color:#24292e;">    : &#39;&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  ListItemBulletImage1: BulletIcon,</span></span>
<span class="line"><span style="color:#24292e;">  ListItemBulletImage2: BulletIcon,</span></span>
<span class="line"><span style="color:#24292e;">  ListItemBulletImage3: filteredDosageAdministrationList.value[2] ? BulletIcon : &#39;&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  User_emailable: userStore.user.email</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="tosmartformpayload-composable" tabindex="-1">toSmartFormPayload composable <a class="header-anchor" href="#tosmartformpayload-composable" aria-label="Permalink to &quot;toSmartFormPayload composable&quot;">​</a></h3><p>This will return the object required for the API request. You can see how it&#39;s used on the sample submit function below. Where the:</p><ul><li>id - is the form id generated from SAM upon uploading the PDF</li><li>form - is the resultForm object as the example above</li><li>timestamp - is the time in EPOCH format</li><li>session - a generated UUID</li><li>schema - the smart-form-fields.json that is downloaded from SAM</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">export function toSmartFormPayload(id, form, timestamp, session, schema) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return {</span></span>
<span class="line"><span style="color:#e1e4e8;">    surveyId: id,</span></span>
<span class="line"><span style="color:#e1e4e8;">    version: 3,</span></span>
<span class="line"><span style="color:#e1e4e8;">    resultset: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      {</span></span>
<span class="line"><span style="color:#e1e4e8;">        submitted: timestamp,</span></span>
<span class="line"><span style="color:#e1e4e8;">        clientFormUUID: session,</span></span>
<span class="line"><span style="color:#e1e4e8;">        ...Object.fromEntries(</span></span>
<span class="line"><span style="color:#e1e4e8;">          Object.entries(form).map(([key, value]) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">            const field = schema.fieldMappings.find(({ fieldName }) =&gt; fieldName === key)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            return [</span></span>
<span class="line"><span style="color:#e1e4e8;">              field.qCol,</span></span>
<span class="line"><span style="color:#e1e4e8;">              {</span></span>
<span class="line"><span style="color:#e1e4e8;">                [field.rCol]: value</span></span>
<span class="line"><span style="color:#e1e4e8;">              }</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">          })</span></span>
<span class="line"><span style="color:#e1e4e8;">        )</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">export function toSmartFormPayload(id, form, timestamp, session, schema) {</span></span>
<span class="line"><span style="color:#24292e;">  return {</span></span>
<span class="line"><span style="color:#24292e;">    surveyId: id,</span></span>
<span class="line"><span style="color:#24292e;">    version: 3,</span></span>
<span class="line"><span style="color:#24292e;">    resultset: [</span></span>
<span class="line"><span style="color:#24292e;">      {</span></span>
<span class="line"><span style="color:#24292e;">        submitted: timestamp,</span></span>
<span class="line"><span style="color:#24292e;">        clientFormUUID: session,</span></span>
<span class="line"><span style="color:#24292e;">        ...Object.fromEntries(</span></span>
<span class="line"><span style="color:#24292e;">          Object.entries(form).map(([key, value]) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">            const field = schema.fieldMappings.find(({ fieldName }) =&gt; fieldName === key)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            return [</span></span>
<span class="line"><span style="color:#24292e;">              field.qCol,</span></span>
<span class="line"><span style="color:#24292e;">              {</span></span>
<span class="line"><span style="color:#24292e;">                [field.rCol]: value</span></span>
<span class="line"><span style="color:#24292e;">              }</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">          })</span></span>
<span class="line"><span style="color:#24292e;">        )</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="sample-function-that-submits-the-smart-form" tabindex="-1">Sample function that submits the smart form <a class="header-anchor" href="#sample-function-that-submits-the-smart-form" aria-label="Permalink to &quot;Sample function that submits the smart form&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">function sendResultToUserEmail() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const toPDF = toSmartFormPayload(formId, resultForm, timestamp, sessionId, schema)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  axios</span></span>
<span class="line"><span style="color:#e1e4e8;">    .post(\`/rest/survey/results\`, toPDF, {</span></span>
<span class="line"><span style="color:#e1e4e8;">      headers: { &#39;Content-Type&#39;: &#39;application/json&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">    .then(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      sentToEmailDialogisToggled.value = true</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">    .catch(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      errorMessage.value =</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;Something went wrong while sending the result. Please try again in a few minutes.&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      nextTick(() =&gt; error.value?.scrollIntoView({ behavior: &#39;smooth&#39;, block: &#39;center&#39; }))</span></span>
<span class="line"><span style="color:#e1e4e8;">      setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">        errorMessage.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">      }, 8000)</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">function sendResultToUserEmail() {</span></span>
<span class="line"><span style="color:#24292e;">  const toPDF = toSmartFormPayload(formId, resultForm, timestamp, sessionId, schema)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  axios</span></span>
<span class="line"><span style="color:#24292e;">    .post(\`/rest/survey/results\`, toPDF, {</span></span>
<span class="line"><span style="color:#24292e;">      headers: { &#39;Content-Type&#39;: &#39;application/json&#39; }</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">    .then(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      sentToEmailDialogisToggled.value = true</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">    .catch(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      errorMessage.value =</span></span>
<span class="line"><span style="color:#24292e;">        &#39;Something went wrong while sending the result. Please try again in a few minutes.&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      nextTick(() =&gt; error.value?.scrollIntoView({ behavior: &#39;smooth&#39;, block: &#39;center&#39; }))</span></span>
<span class="line"><span style="color:#24292e;">      setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">        errorMessage.value = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">      }, 8000)</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>Upon submitting the form, the set recipient in SAM should receive a copy of the PDF result and if &quot;User_Emailable&quot; is set in the PDF fields, a copy should also be sent to the user who filled out the form.</p><h2 id="naming-smart-form-fields" tabindex="-1">Naming smart form fields <a class="header-anchor" href="#naming-smart-form-fields" aria-label="Permalink to &quot;Naming smart form fields&quot;">​</a></h2><p><sub>(These are all grabbed from the previous wiki, then modified.)</sub></p><h3 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h3><ol><li><p>After SAM release on May 8, 2016: rather than setting a form INACTIVE, set the form to RETIRED. This state is like a &#39;soft&#39; inactive, meaning, SmartForm submissions can be still submitted. In the table this state will be displayed with the letter &#39;R&#39;</p></li><li><p>The fields/IDs in the PDF form must be unique and should be PascalCase and as expressive as possible. However, it should only contain alphabetical characters (a-z, A-Z, no space, dash or underscore, with exceptions to this rule lined out below.)</p><p><strong>Example Fields</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ThisIsASmartFormFieldExample</span></span>
<span class="line"><span style="color:#e1e4e8;">ThisIsASmartFormFieldExample9000</span></span>
<span class="line"><span style="color:#e1e4e8;">This_Is_A_Smart_Form_Field_Example</span></span>
<span class="line"><span style="color:#e1e4e8;">This-Is-A-Smart-Form-Field-Example2</span></span>
<span class="line"><span style="color:#e1e4e8;">This_Is_A_Smart_Form_Field_Example100</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ThisIsASmartFormFieldExample</span></span>
<span class="line"><span style="color:#24292e;">ThisIsASmartFormFieldExample9000</span></span>
<span class="line"><span style="color:#24292e;">This_Is_A_Smart_Form_Field_Example</span></span>
<span class="line"><span style="color:#24292e;">This-Is-A-Smart-Form-Field-Example2</span></span>
<span class="line"><span style="color:#24292e;">This_Is_A_Smart_Form_Field_Example100</span></span></code></pre></div></li></ol><h3 id="reserved-fields" tabindex="-1"><strong>Reserved fields</strong> <a class="header-anchor" href="#reserved-fields" aria-label="Permalink to &quot;**Reserved fields**&quot;">​</a></h3><blockquote><p><em><strong>These are important, please take not of this when building the fields.</strong></em></p></blockquote><blockquote><blockquote><p><strong>SmartFormUniqueID</strong> - this is used to generate a unique ID (across all SmartForms)</p></blockquote></blockquote><blockquote><blockquote><p><strong>Text_Emailable</strong> - allows the email from this field to receive a copy of the PDF</p></blockquote></blockquote><blockquote><blockquote><p><strong>Text_Image</strong> - allows this field to be treated as an image, e.g. for signatures</p></blockquote></blockquote><blockquote><p>&quot;Text&quot; can be replaced by any name, just make sure to keep _Emailable or _Image so that the smart form recognizes the field type. An image field won&#39;t be recognized without the keyword &quot;image&quot;.</p></blockquote><ul><li><p><strong>How to name radio buttons and checkboxes</strong></p><ul><li>Text_RadioValue</li><li>Text_CheckboxValue</li><li>e.g. Received_No, Received_Yes</li></ul></li></ul><ol start="3"><li><p>Do not collect credit card information due to the need for PCI compliance</p></li><li><p>It&#39;s good to know that SmartForms also work on MI Desktop, including the ability to take a signature.</p></li><li><p>All SmartForms should</p><p>i. do field validation that the max length of any fields should not exceed 1500 characters (with the exception of signature/images fields).</p><p>ii. In case the form doesn&#39;t submit the error code from the server display the error message (when/if provided)</p></li></ol><p><sub>SmartPDF creation: Currently SmartForms can only be created by INTERACT agency.</sub></p>`,48),i=[p];function r(c,u,m,d,h,y){return e(),a("div",null,i)}const q=s(o,[["render",r]]);export{g as __pageData,q as default};
