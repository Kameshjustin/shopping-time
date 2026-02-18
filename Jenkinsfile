pipeline {

    agent any

    environment {

        DOCKER_IMGAGE = 'shopping-application-image'
        DOCKER_CONTAINER = 'shopping-application-container'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Github branch') {
            steps {
                git branch: 'main', 
                credentialsId: 'frontend-credentials', 
                url: 'https://github.com/Kameshjustin/shopping-time.git'
            }
        }

        stage('Check node & npm versions') {
            steps {
                sh '''
                   node -v
                   npm -v
                '''
                echo 'node and npm installed successfully'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -D vitest'
            }
        }

        stage('Build application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Testing application') {
            steps {
                sh 'npm test -- --run'
            }
        }

        stage('Docker build image') {
            steps {
                sh 'docker build -t $DOCKER_IMGAGE .'
                echo 'docker image build successfully'
            }
        }

        stage('Remove old container') {
            steps {
                sh '''
                   if docker ps -aq -f name=$DOCKER_CONTAINER | grep -q . ; then
                        echo "Container exists removing"
                        docker rm -f $DOCKER_CONTAINER
                    else
                        echo "Container does not exist.."
                    fi
                '''
            }
        }


        stage('Create new container') {
            steps {
                sh '''
                   docker run -d -p 3000:3000 --name=$DOCKER_CONTAINER $DOCKER_IMGAGE     

                '''
                echo 'Container created successfully'
            }
        }
    }


    post {

        success {
            echo 'Pipeline run successfully'
        }

        failure {
            echo 'Pipeline failed ...'
        }

        always {
            echo 'Pipeline run completed ....'
        }
    }
}
