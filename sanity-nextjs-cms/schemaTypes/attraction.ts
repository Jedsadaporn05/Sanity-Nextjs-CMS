export default {
  name: 'attraction',
  type: 'document',
  title: 'Attraction',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'detail',
      type: 'string',
      title: 'Detail',
    },
    {
      name: 'coverimage',
      type: 'image',
      title: 'CoverImage',
    },
    {
      name: 'latitude',
      type: 'number',
      title: 'Latitude',
    },
    {
      name: 'longitude',
      type: 'number',
      title: 'Longitude',
    },
  ],
}