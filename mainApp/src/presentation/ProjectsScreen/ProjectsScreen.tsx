import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useProjects } from '../../core/modules/projectsModule';
import { Button, ProjectCard } from 'uikit';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/navigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ProjectsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { projects, loading, refresh } = useProjects();

    const handleCreateProject = () => {
        navigation.navigate('CreateProjectScreen');
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={projects}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={refresh}
                refreshing={loading}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <ProjectCard
                        title={item.projectName}
                        elapsedTime={item.forWho || 'Заказчик не указан'}
                    />
                )}
            />
            <View style={styles.buttonWrapper}>
                <Button onPress={handleCreateProject} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5' 
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    }
});

export default ProjectsScreen;
