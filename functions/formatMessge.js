const vscode = require('vscode');

const JIRA_ID_REGEX = /((?<!([A-Za-z]{1,10})-?)[A-Z]+-\d+)/g;

module.exports = (message) => {
	const { enableJiraLinks, jiraUrl } = vscode.workspace.getConfiguration('svn-gutter');
	if (enableJiraLinks && jiraUrl) {
		return message.replace(JIRA_ID_REGEX, (jiraId) => {
			const url = [
				jiraUrl.replace(/\/$/, ''),
				'browse',
				jiraId,
			].join('/');
			return `[${jiraId}](${url})`;
		})
	} else {
		return message;
	}
}