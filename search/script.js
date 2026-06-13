const searchEntries = [
  {
    keywords: ['よろずや'],
    title: 'よろずや｜どんな依頼も、記録に残す',
    url: '../yorozuya/',
    description: '石山県尾羽市に拠点を置く総合依頼窓口。引っ越し、代筆、配達、記録整理など幅広い依頼に対応している。',
  },
  {
    keywords: ['地元の名士'],['近藤銅一'],['東翔琉'], ['仁士守仁'],
    title: '地元の名士たち｜三人の代表者インタビュー',
    url: '../article/famous-people/',
    description: '近藤銅一、東翔琉、仁士守仁。地域を動かしてきた三名の人物に聞く、仕事と家族、そして受け継がれるもの。',
  },
  {
    keywords: ['近藤銅一'],
    title: '近藤銅一｜よろずや代表インタビュー',
    url: '../kondo/',
    description: '人助けを仕事に変えた男。よろずや代表・近藤銅一が語る、依頼と記録への考え方。',
  },
  {
    keywords: ['東翔琉'],
    title: '東翔琉｜東建設代表インタビュー',
    url: '../Kakeru/',
    description: '「我らの未来は過去にあり」。富谷県永海市で東建設を率いる東翔琉の思想と家族観。',
  },
  {
    keywords: ['仁士守仁'],
    title: '仁士守仁｜ウェストテレビ代表インタビュー',
    url: '../Morihito/',
    description: '「常に変化し、最先端であり続ける。」石山県服部市から事業を広げた仁士守仁の歩み。',
  },
  {
    keywords: ['東建設'],
    title: '東建設｜富谷県永海市の建設・不動産',
    url: '../azuma-construction/',
    description: '明治18年創業。土地、建築、不動産を通じて地域とともに歩んできた東家の事業。',
  },
  {
    keywords: ['ウェストテレビ'],
    title: 'ウェストテレビ｜石山県服部市の地域メディア企業',
    url: '../west-tv/',
    description: '平成2年設立。テレビ、不動産、通信事業を横断する仁士家の中核企業。',
  },
  {
    keywords: ['東辰也'],
    title: '関連記録が制限されています',
    description: 'この人物に関する詳細記録は、よろずや社内アーカイブの認証後に閲覧できます。',
    restricted: true,
  },
  {
    keywords: ['仁士鏡花'],
    title: '関連記録が制限されています',
    description: 'この人物に関する詳細記録は、よろずや社内アーカイブの認証後に閲覧できます。',
    restricted: true,
  },
  {
    keywords: ['東大樹'],
    title: '関連記録が制限されています',
    description: 'この人物に関する詳細記録は、よろずや社内アーカイブの認証後に閲覧できます。',
    restricted: true,
  },
];

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const resultsList = document.querySelector('#results-list');
const resultsSummary = document.querySelector('#results-summary');
const hintButton = document.querySelector('.hint-button');
const hintPanel = document.querySelector('#hint-panel');

const normalize = (value) => value.trim().toLowerCase();

const createResultCard = (entry) => {
  const card = document.createElement('article');
  card.className = entry.restricted ? 'result-card result-card--restricted' : 'result-card';

  if (entry.restricted) {
    const label = document.createElement('span');
    label.className = 'restricted-label';
    label.textContent = 'ARCHIVE AUTH REQUIRED';
    card.append(label);
  }

  const title = document.createElement('h3');
  title.className = 'result-title';

  if (entry.url) {
    const link = document.createElement('a');
    link.href = entry.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = entry.title;
    title.append(link);
  } else {
    title.textContent = entry.title;
  }

  const description = document.createElement('p');
  description.className = 'result-description';
  description.textContent = entry.description;

  card.append(title);

  if (entry.url) {
    const url = document.createElement('p');
    url.className = 'result-url';
    url.textContent = entry.url;
    card.append(url);
  }

  card.append(description);
  return card;
};

const renderEmpty = (message, subMessage) => {
  resultsList.replaceChildren();
  const empty = document.createElement('article');
  empty.className = 'empty-state';
  const firstLine = document.createElement('p');
  firstLine.textContent = message;
  const secondLine = document.createElement('p');
  secondLine.textContent = subMessage;
  empty.append(firstLine, secondLine);
  resultsList.append(empty);
};

const renderResults = (query) => {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    resultsSummary.textContent = '検索語を入力すると、該当する公開記録がここに表示されます。';
    renderEmpty('未完了依頼に関係しそうな人物名、企業名、記事名を検索してください。', '入力後、Enterキーでも照合できます。');
    return;
  }

  const matches = searchEntries.filter((entry) =>
    entry.keywords.some((keyword) => normalize(keyword).includes(normalizedQuery) || normalizedQuery.includes(normalize(keyword))),
  );

  resultsList.replaceChildren();

  if (matches.length === 0) {
    resultsSummary.textContent = `「${query}」の照合結果：0件`;
    renderEmpty('該当する記録は見つかりませんでした', '別の表記、人物名、企業名で検索してください');
    return;
  }

  resultsSummary.textContent = `「${query}」の照合結果：${matches.length}件｜照合日時：2060/04/07｜検索対象：公開記録`;
  resultsList.append(...matches.map(createResultCard));
};

if (form && input && resultsList && resultsSummary) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderResults(input.value);
  });
}

if (hintButton && hintPanel) {
  hintButton.addEventListener('click', () => {
    const isExpanded = hintButton.getAttribute('aria-expanded') === 'true';
    hintButton.setAttribute('aria-expanded', String(!isExpanded));
    hintPanel.hidden = isExpanded;
  });
}
