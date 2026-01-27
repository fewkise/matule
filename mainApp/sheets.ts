import {registerSheet} from 'react-native-actions-sheet'
import {CategorySheet, BottomSheet} from 'uikit'
registerSheet('category-gender-sheet', CategorySheet)
registerSheet ('category-project-sheet', CategorySheet)
registerSheet ('description-sheet', BottomSheet)
registerSheet ('img-sheet', CategorySheet)
export {}