import { createAction } from 'redux-actions'
import Api from 'js/api'

export default {
  gets: createAction('FILE_GETS', Api.File.gets),
  upload: createAction('FILE_UPLOAD', Api.File.upload),
  delete: createAction('FILE_DELETE', Api.File.delete)
}
