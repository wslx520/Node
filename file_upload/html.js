function htmlTemplate (title, body) {
	return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<title>${title}</title>
</head>
<body>
${body}
</body>
</html>`;
}

module.exports = htmlTemplate;