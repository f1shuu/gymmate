import { Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Container from '../../components/Container';

import packageJson from '../../package.json';
import { useSettings } from '../../helpers/SettingsProvider';

const appVersion = packageJson?.version || '1.0.0';
const changelogAssets = {
    pl: require('../../CHANGELOG-PL.md'),
    en: require('../../CHANGELOG-EN.md')
}
const repoUrl = 'https://github.com/f1shuu/gymmate/releases/latest';

const readAssetText = async (assetModule) => {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();

    const candidateUris = [...new Set([asset.localUri, asset.uri].filter(Boolean))];
    let lastError = null;

    for (const uri of candidateUris) {
        try {
            const response = await fetch(uri);
            if (!response.ok && response.status !== 0) throw new Error(`Could not load changelog (${response.status})`);
            return await response.text();
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error('Changelog asset has no readable URI');
}

const renderMarkdown = (markdown, styles) => markdown
    .split(/\r?\n/)
    .map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return <View key={`space-${index}`} style={styles.markdownSpacer} />;

        const heading = line.match(/^(#{1,3})\s+(.+)$/);
        if (heading) {
            return (
                <Text
                    key={`heading-${index}`}
                    style={heading[1].length === 1 ? styles.markdownTitle : styles.markdownHeading}
                >
                    {heading[2]}
                </Text>
            )
        }

        const bullet = line.match(/^[-*+]\s+(.+)$/);
        if (bullet) {
            return (
                <View key={`bullet-${index}`} style={styles.bulletRow}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletText}>{bullet[1]}</Text>
                </View>
            )
        }

        return <Text key={`paragraph-${index}`} style={styles.markdownParagraph}>{line}</Text>;
    })

export default function ChangelogScreen() {
    const [changelog, setChangelog] = useState(null);
    const [hasLoadError, setHasLoadError] = useState(false);
    const { settings, theme, translate } = useSettings();
    const language = settings?.language === 'pl' ? 'pl' : 'en';

    useEffect(() => {
        let isActive = true;
        setChangelog(null);
        setHasLoadError(false);

        const loadChangelog = async () => {
            try {
                const content = await readAssetText(changelogAssets[language]);
                if (isActive) setChangelog(content.trim());
            } catch (error) {
                console.error(error);
                if (isActive) setHasLoadError(true);
            }
        }

        loadChangelog();
        return () => {
            isActive = false;
        }
    }, [language])

    const styles = {
        markdownSpacer: {
            height: 6
        },
        markdownTitle: {
            fontFamily: 'Nexa',
            fontSize: 21,
            lineHeight: 28,
            color: theme.textPrimary,
            marginTop: 8,
            marginBottom: 4
        },
        markdownHeading: {
            fontFamily: 'Nexa',
            fontSize: 18,
            lineHeight: 25,
            color: theme.primary,
            marginTop: 8,
            marginBottom: 4
        },
        bulletRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 7
        },
        bulletSymbol: {
            width: 20,
            fontFamily: 'Nexa',
            fontSize: 17,
            lineHeight: 23,
            color: theme.primary
        },
        bulletText: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 14,
            lineHeight: 21,
            color: theme.textPrimary
        },
        markdownParagraph: {
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 23,
            color: theme.textPrimary
        },
        content: {
            flexGrow: 1,
            paddingTop: 12,
            paddingBottom: 24,
            gap: 15
        },
        hero: {
            backgroundColor: theme.background,
            borderRadius: 10,
            paddingHorizontal: 24,
            paddingVertical: 30,
            alignItems: 'center'
        },
        version: {
            fontFamily: 'Nexa',
            fontSize: 24,
            lineHeight: 30,
            color: theme.textPrimary,
            textAlign: 'center'
        },
        markdown: {
            width: '100%',
            marginTop: 15
        },
        loadingText: {
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 23,
            color: hasLoadError ? theme.textPrimary : theme.textSecondary,
            textAlign: 'center'
        },
        repoCard: {
            minHeight: 80,
            borderRadius: 10,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            gap: 15
        },
        repoIcon: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        },
        repoText: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textPrimary
        }
    }

    const openUrl = async () => {
        try {
            await Linking.openURL(repoUrl);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <Text style={styles.version}>{translate('version')} {appVersion}</Text>
                    <View style={styles.markdown}>
                        {changelog
                            ? renderMarkdown(changelog, styles)
                            : <Text style={styles.loadingText}>{translate(hasLoadError ? 'error' : 'loading')}</Text>}
                    </View>
                </View>

                <TouchableOpacity style={styles.repoCard} activeOpacity={0.8} onPress={openUrl}>
                    <View style={styles.repoIcon}>
                        <Icon name='github' size={26} color={theme.primary} />
                    </View>
                    <Text style={styles.repoText}>{translate('seeRepo')}</Text>
                    <Icon name='external-link-alt' size={18} color={theme.tertiary} />
                </TouchableOpacity>
            </ScrollView>
        </Container>
    )
}