import React from 'react'
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, 
    shouldShowList: true, 
  }),
});
export const missingNofification = async ()=>{
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
        content:{
            title:'Matule',
            body:'минута без моего приложения...',
            sound:true
        },
        trigger:{
            type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 60
        }
    })
}
export const cancelNotification = async()=>{
    await Notifications.cancelAllScheduledNotificationsAsync()
}
export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Вы запретили уведомления, мы не сможем вам напомнить о себе.');
  }
};
