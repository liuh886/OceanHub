import type { MarketProvider } from '../lib/marketProvider';

export const marketProviders: MarketProvider[] = [
  {
    id: 'fugro',
    name: 'Fugro',
    summary: 'Integrated marine site characterisation, metocean and environmental Geo-data services for offshore energy and infrastructure projects.',
    website: 'https://www.fugro.com/',
    deliveryFootprint: 'Global / multi-region',
    capabilityIds: [
      'hydrographic-survey',
      'marine-geophysics',
      'marine-geotechnics',
      'ground-modeling',
      'metocean-observation-analysis',
      'marine-environmental-assessment',
      'underwater-acoustics',
      'geospatial-change-detection'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Geophysical and site appraisal',
        publisher: 'Fugro',
        url: 'https://www.fugro.com/expertise/geophysical-and-site-appraisal'
      },
      {
        title: 'Site characterisation for Revolution Wind',
        publisher: 'Fugro',
        url: 'https://www.fugro.com/expertise/case-studies/site-characterisation-revolution-wind-fugro'
      },
      {
        title: 'Marine assessment, characterisation & monitoring',
        publisher: 'Fugro',
        url: 'https://www.fugro.com/expertise/environmental-site-assessments/marine-characterisation-and-monitoring'
      }
    ]
  },
  {
    id: 'tgs',
    name: 'TGS',
    summary: 'Marine seismic, subsurface imaging and integrated site-characterisation services spanning offshore wind and carbon-storage applications.',
    website: 'https://www.tgs.com/',
    deliveryFootprint: 'Global offshore markets',
    capabilityIds: [
      'marine-seismic-acquisition',
      'time-lapse-seismic',
      'marine-geophysics',
      'hydrographic-survey',
      'ground-modeling'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Subsurface Insights for Offshore Wind',
        publisher: 'TGS',
        url: 'https://www.tgs.com/wind/subsurface'
      },
      {
        title: 'UHR3D marine acquisition',
        publisher: 'TGS',
        url: 'https://www.tgs.com/seismic/marine-acquisition/towed-streamer-solutions/uhr3d'
      }
    ]
  },
  {
    id: 'slb',
    name: 'SLB',
    summary: 'Carbon-storage site evaluation, well engineering, monitoring and subsurface measurement workflows across the CCS lifecycle.',
    website: 'https://www.slb.com/',
    deliveryFootprint: 'Global / multi-region',
    capabilityIds: [
      'reservoir-characterization',
      'petrophysics-well-testing',
      'ccs-well-engineering',
      'reservoir-geomechanics',
      'distributed-fiber-sensing',
      'ccs-mrv-data-assurance'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Carbon storage evaluation measurements',
        publisher: 'SLB',
        url: 'https://www.slb.com/products-and-services/scaling-new-energy-systems/carbon-capture-utilization-and-sequestration/carbon-storage/carbon-storage-site-evaluation/site-appraisal-measurements-for-ccs'
      },
      {
        title: 'Carbon sequestration',
        publisher: 'SLB',
        url: 'https://www.slb.com/products-and-services/scaling-new-energy-systems/carbon-capture-utilization-and-sequestration/carbon-storage'
      }
    ]
  },
  {
    id: 'saipem',
    name: 'Saipem',
    summary: 'Offshore engineering, procurement, construction and installation capability for subsea pipelines and CCS transport infrastructure.',
    website: 'https://www.saipem.com/',
    deliveryFootprint: 'Global offshore markets',
    capabilityIds: [
      'subsea-pipeline-engineering',
      'pipeline-installation',
      'marine-operations-planning',
      'systems-integration'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Saipem selected for offshore CO2 transportation infrastructure',
        publisher: 'Saipem',
        url: 'https://www.saipem.com/en/media/press-releases/2024-03-15/saipem-signed-letter-intent-development-co2-offshore-transportation'
      }
    ]
  },
  {
    id: 'subsea7',
    name: 'Subsea7',
    summary: 'Lifecycle subsea engineering and offshore construction from concept and FEED through installation, maintenance and decommissioning.',
    website: 'https://www.subsea7.com/',
    deliveryFootprint: 'Global offshore markets',
    capabilityIds: [
      'subsea-pipeline-engineering',
      'pipeline-installation',
      'subsea-production-systems',
      'marine-operations-planning',
      'systems-integration',
      'decommissioning-engineering'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'What We Do',
        publisher: 'Subsea7',
        url: 'https://www.subsea7.com/en/our-business/what-we-do.html'
      }
    ]
  },
  {
    id: 'oceaneering',
    name: 'Oceaneering',
    summary: 'Survey, positioning, ROV, remote operations and subsea inspection services supporting installation, IMR and decommissioning.',
    website: 'https://www.oceaneering.com/',
    deliveryFootprint: 'Global / multi-region',
    capabilityIds: [
      'hydrographic-survey',
      'acoustic-positioning',
      'autonomous-subsea-survey',
      'geospatial-change-detection',
      'subsea-integrity-engineering',
      'pipeline-route-engineering'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Survey and Positioning',
        publisher: 'Oceaneering',
        url: 'https://www.oceaneering.com/survey-and-mapping/survey-and-positioning/'
      },
      {
        title: 'Integrated Subsea Project Solutions',
        publisher: 'Oceaneering',
        url: 'https://www.oceaneering.com/subsea-projects/integrated-subsea-project-solutions/'
      }
    ]
  },
  {
    id: 'dnv',
    name: 'DNV',
    summary: 'Independent offshore assurance, marine warranty and mission-specific marine operations advisory.',
    website: 'https://www.dnv.com/',
    deliveryFootprint: 'Global / multi-region',
    capabilityIds: [
      'marine-operations-planning',
      'risk-comparative-assessment'
    ],
    evidenceBasis: 'public-source-mapped',
    sources: [
      {
        title: 'Marine warranty services',
        publisher: 'DNV',
        url: 'https://www.dnv.com/services/marine-warranty-services-2944/'
      },
      {
        title: 'Marine operations and surveys',
        publisher: 'DNV',
        url: 'https://www.dnv.com/services/marine-operations-and-surveys-3317/'
      }
    ]
  }
];
