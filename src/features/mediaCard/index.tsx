import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

type MediaCardProps = {
  image: {
    url: string
    title: string
  },
  content: {
    title: string
    body: string
  }
  action?: {
    url: string | null | undefined
    title: string | null | undefined
  }
}

export default function MediaCard({image, content, action}: MediaCardProps) {
  const theme = useTheme()

  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
  
      <CardMedia
        sx={{
          height: 200,
          backgroundColor: theme.palette.primary.light,
          backgroundSize: '90% 90%',
          backgroundRepeat: 'no-repeat'
        }}
        image={image.url}
        title={image.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {content.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.body}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {Boolean(action?.title && action.url) &&
          <Button
            size="small"
            href={action!.url!}
            target="_blank"
          >
            {action!.title!}
          </Button>
        }
      </CardActions>
  
    </Card>
  )
}