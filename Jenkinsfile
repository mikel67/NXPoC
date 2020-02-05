pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS 12.14.1'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '4', artifactNumToKeepStr: '1'))
    }
    
    stages {
        stage('Env Setup') {
            steps {
                script {
                                
                  sh """
                        node -v
                        npm install
                        npm run pre-build
                        printenv
                   """
                }
            }
        }
        
       stage("Build") {
            steps{

                nodejs(nodeJSInstallationName: 'NodeJS 12.14.1') {
                    sh """
                        node -v 
                        npm -v
                        npx nx affected:build
                    """
                }

            }
                        
        }
                
    }

    post {
        always {
            archive '**/*'
        }
        unstable {
            slackSend channel: "${params.SlackChannel}",
                      color: 'warning',
                      message: "Unstable Build ${currentBuild.fullDisplayName}.\nBuild details : ${env.BUILD_URL}"
        } 
    }   

}