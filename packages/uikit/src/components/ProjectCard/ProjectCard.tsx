import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

interface ProjectCardProps {
  title: string;
  photo: { uri: string };
  elapsedTime: string;
  onOpenPress: () => void;
}

/**
 * Компонент ProjectCard — карточка проекта, отображающая превью работы.
 * Используется для визуализации активных или завершенных проектов с указанием затраченного времени.
 * 
 * @param {string} title - Название или заголовок проекта.
 * @param {Object} photo - Объект с URI изображения для обложки проекта.
 * @param {string} elapsedTime - Строка, отображающая прошедшее или затраченное время (например, "2 дня назад").
 * @param {() => void} onOpenPress - Функция-обработчик нажатия на кнопку "Открыть" для перехода к деталям проекта.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ title, elapsedTime, onOpenPress, photo }) => {
  return (
    <Card style={styles.card} elevation={1}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>{title}</Text>
      </Card.Content>
      
      <Card.Cover source={photo} style={styles.image} />
      
      <Card.Actions style={styles.bottomRow}>
        <Text variant="bodyLarge" style={styles.elapsedTime}>{elapsedTime}</Text>
        <Button 
          mode="contained" 
          onPress={onOpenPress}
          contentStyle={styles.buttonContent}
          style={styles.button}
        >
          Открыть
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    minHeight: 336,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    height: 150,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
  },
  bottomRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  elapsedTime: {
    color: '#999',
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  }
});

export default ProjectCard;
