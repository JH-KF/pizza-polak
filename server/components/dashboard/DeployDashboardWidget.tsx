import {DashboardWidget, DashboardWidgetContainer, LayoutConfig} from '@sanity/dashboard'
import {Badge, Button} from '@sanity/ui'
import React, {useEffect, useState} from 'react'

import styles from './deploy-dashboard-widget.module.scss'

type Status = 'building' | 'ready' | 'error' | null;

const STATUS_MAP_LABEL = {
  building: 'En cours',
  ready: 'Succès',
  error: 'En erreur',
}

const DEPLOY_TRIGGER_URL = process.env.SANITY_STUDIO_DEPLOY_TRIGGER_URL || ''
const TIMEOUT_INTERVAL = 10000; // 10 seconds

function DeploymentTag({status}: {status: Status}) {
    let tone: 'positive' | 'caution' | 'critical' | 'default' = 'default'
  
    switch (status) {
      case 'ready':
        tone = 'positive'
        break
      case 'building':
        tone = 'caution'
        break
      case 'error':
        tone = 'critical'
        break
      default:
        tone = 'default'
    }
  
    return <Badge tone={tone}>{status ? STATUS_MAP_LABEL[status] : 'INCONNU'}</Badge>
  }

function Component() {
    const [deploymentStatus, setDeploymentStatus] = useState<'building' | 'ready' | 'error' | null>(null)
    const [deploymentDate, setDeploymentDate] = useState<Date | null>(null)

    async function fetchDeploymentStatus() {
        const response = await fetch('https://api.netlify.com/api/v1/sites/0d4633b3-9850-448b-9c06-4b1d7b9b4e77/deploys')
        const data = await response.json()
        const latestDeploy = data[0] // Assuming the latest deploy is the first item
        setDeploymentStatus(latestDeploy.state)
        setDeploymentDate(new Date(latestDeploy.created_at))
        if(latestDeploy.state === "building") {
            setTimeout(() => {
                fetchDeploymentStatus()
            }, TIMEOUT_INTERVAL)
        }
    }

    function triggerDeployment(){
        fetch(DEPLOY_TRIGGER_URL, {method: 'POST'})
        setDeploymentStatus('building');
        setTimeout(() => {
            fetchDeploymentStatus()
        }, TIMEOUT_INTERVAL)
    }

    useEffect(() => {
        fetchDeploymentStatus();
    }, [])

  return (
    <DashboardWidgetContainer>
      <div className={styles.container}>
        <a href='https://polak-oizza.fr' target='_blank' rel='noopener noreferrer'>polak-pizza.fr</a>
        <div className={styles.header}>
            <h3>
                Dernier déploiement : 
            </h3>
            {deploymentStatus ? <DeploymentTag status={deploymentStatus} /> : '...' } 
        </div>
        <div>
            {deploymentDate && <p>Le {deploymentDate?.toLocaleDateString('fr', {"day": "numeric", "month": "long", "year": "numeric", "hour": "numeric", "minute": "2-digit"})}</p>}
        </div>
        <p>
           (Déploiement automatique tout les jours à 7h00 et 21h00)
        </p>
        <div>
            {DEPLOY_TRIGGER_URL && <Button
                text={deploymentStatus === "building" ? 'Déploiement en cours...' : 'Déclencher un déploiement'}
                tone="primary"
                disabled={deploymentStatus === 'building'}
                onClick={triggerDeployment}
                
            />}
        </div>
        {deploymentStatus ==="building" && <img className={styles.loadingImage} src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWF3cW05N2ZkODRhM3hmMW9reTY2OXo0Yzh1ZmlodWVmMzdpaXU2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10kxE34bJPaUO4/giphy.gif" alt="Déploiement en cours" height={200} />}
      </div>
    </DashboardWidgetContainer>
  )
}

function deployDashboardWidget(config?: {layout?: LayoutConfig}) : DashboardWidget {
  return {
    name: 'deploy-dashboard-widget',
    component: Component,
    layout: config?.layout ?? {width: 'medium', height: 'auto'},
  }
}

export default deployDashboardWidget