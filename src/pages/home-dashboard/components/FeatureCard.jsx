import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCard = ({ icon, title, description, highlight }) => {
  return (
    <div className="bg-card rounded-lg p-8 shadow-medium hover:shadow-elevated transition-state border border-border">
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          highlight ? 'bg-primary' : 'bg-accent'
        }`}>
          <Icon 
            name={icon} 
            size={32} 
            color="white" 
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;